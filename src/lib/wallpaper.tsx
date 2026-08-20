"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { storageGet, storageSet } from "./safe-storage";

export type WallpaperId = "jellyfish" | "yosemite" | "bridge" | "gradient";

export const WALLPAPERS: { id: WallpaperId; src?: string; labelPt: string; labelEn: string }[] = [
  { id: "jellyfish", src: "/wallpapers/jellyfish.jpg", labelPt: "Água-viva", labelEn: "Jellyfish" },
  { id: "yosemite", src: "/wallpapers/yosemite.jpg", labelPt: "Montanhas", labelEn: "Mountains" },
  { id: "bridge", src: "/wallpapers/bridge.jpg", labelPt: "Ponte à noite", labelEn: "Bridge at night" },
  { id: "gradient", labelPt: "Gradiente", labelEn: "Gradient" },
];

const STORAGE_KEY = "guios.wallpaper";

interface WallpaperValue {
  wallpaper: WallpaperId;
  setWallpaper: (w: WallpaperId) => void;
  cycleWallpaper: () => void;
}

const WallpaperContext = createContext<WallpaperValue | null>(null);

export function WallpaperProvider({ children }: { children: React.ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<WallpaperId>("jellyfish");

  useEffect(() => {
    const saved = storageGet("local", STORAGE_KEY);
    if (saved && WALLPAPERS.some((w) => w.id === saved)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setWallpaperState(saved as WallpaperId);
    }
  }, []);

  const setWallpaper = useCallback((w: WallpaperId) => {
    setWallpaperState(w);
    storageSet("local", STORAGE_KEY, w);
  }, []);

  const cycleWallpaper = useCallback(() => {
    setWallpaperState((prev) => {
      const idx = WALLPAPERS.findIndex((w) => w.id === prev);
      const next = WALLPAPERS[(idx + 1) % WALLPAPERS.length].id;
      storageSet("local", STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <WallpaperContext.Provider value={{ wallpaper, setWallpaper, cycleWallpaper }}>
      {children}
    </WallpaperContext.Provider>
  );
}

export function useWallpaper(): WallpaperValue {
  const ctx = useContext(WallpaperContext);
  if (!ctx) throw new Error("useWallpaper deve ser usado dentro de WallpaperProvider");
  return ctx;
}
