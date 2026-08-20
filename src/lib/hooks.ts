"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { storageGet, storageSet } from "./safe-storage";

const QUERY = "(max-width: 767px)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// SSR: assume desktop; o client corrige na hidratação.
function getServerSnapshot() {
  return false;
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// ---- Conexão real do visitante (navigator.onLine + Network Information API) ----

interface NetworkConnection extends EventTarget {
  effectiveType?: string;
}

function getConnection(): NetworkConnection | undefined {
  return (navigator as Navigator & { connection?: NetworkConnection }).connection;
}

function subscribeOnline(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  const conn = getConnection();
  conn?.addEventListener("change", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
    conn?.removeEventListener("change", callback);
  };
}

export function useOnline(): boolean {
  return useSyncExternalStore(
    subscribeOnline,
    () => navigator.onLine,
    () => true,
  );
}

export function useConnectionType(): string | null {
  return useSyncExternalStore(
    subscribeOnline,
    () => getConnection()?.effectiveType ?? null,
    () => null,
  );
}

// ---- Bateria real (Battery Status API) com fallback "cafeína do Gui" ----

interface BatteryManager extends EventTarget {
  level: number;
  charging: boolean;
}

export interface BatteryInfo {
  /** true = Battery Status API disponível (nível real do dispositivo) */
  real: boolean;
  /** 0..1 */
  level: number;
  charging: boolean;
}

// Fallback bem-humorado: cafeína enche de madrugada e esvazia ao longo do dia.
function caffeineLevel(): BatteryInfo {
  const h = new Date().getHours();
  if (h < 8) return { real: false, level: Math.max(0.2, (h + 1) / 8), charging: true };
  return { real: false, level: Math.max(0.1, 1 - (h - 8) * 0.06), charging: false };
}

// ---- Clima real de Bragança Paulista (Open-Meteo, sem chave) ----

export interface WeatherInfo {
  temp: number;
  code: number;
}

const WEATHER_CACHE_KEY = "guios.weather";
const WEATHER_TTL_MS = 30 * 60 * 1000;

export function useWeather(): WeatherInfo | null {
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    const apply = (w: WeatherInfo) => {
      if (!cancelled) setWeather(w);
    };

    const cached = storageGet("session", WEATHER_CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as WeatherInfo & { at: number };
        if (Date.now() - parsed.at < WEATHER_TTL_MS) {
          Promise.resolve().then(() => apply({ temp: parsed.temp, code: parsed.code }));
          return;
        }
      } catch {
        // cache corrompido — segue para o fetch
      }
    }

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-22.9527&longitude=-46.5419&current=temperature_2m,weather_code&timezone=America/Sao_Paulo",
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const current = data?.current;
        if (typeof current?.temperature_2m !== "number") return;
        const w = { temp: Math.round(current.temperature_2m), code: current.weather_code ?? 0 };
        storageSet("session", WEATHER_CACHE_KEY, JSON.stringify({ ...w, at: Date.now() }));
        apply(w);
      })
      .catch(() => {
        // sem clima hoje — o widget simplesmente não aparece
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return weather;
}

export function useBattery(): BatteryInfo {
  const [info, setInfo] = useState<BatteryInfo>(() => ({ real: false, level: 1, charging: true }));

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<BatteryManager> };
    if (!nav.getBattery) {
      // Fallback único por sessão + atualização por minuto — sem cascata de renders.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInfo(caffeineLevel());
      const id = setInterval(() => setInfo(caffeineLevel()), 60_000);
      return () => clearInterval(id);
    }
    let battery: BatteryManager | null = null;
    let cancelled = false;
    const update = () => {
      if (battery && !cancelled) {
        setInfo({ real: true, level: battery.level, charging: battery.charging });
      }
    };
    nav.getBattery().then((b) => {
      battery = b;
      update();
      b.addEventListener("levelchange", update);
      b.addEventListener("chargingchange", update);
    });
    return () => {
      cancelled = true;
      battery?.removeEventListener("levelchange", update);
      battery?.removeEventListener("chargingchange", update);
    };
  }, []);

  return info;
}
