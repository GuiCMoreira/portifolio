"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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
