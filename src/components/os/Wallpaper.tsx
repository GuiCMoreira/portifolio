"use client";

import { useWallpaper, WALLPAPERS } from "@/lib/wallpaper";

export function Wallpaper() {
  const { wallpaper } = useWallpaper();
  const def = WALLPAPERS.find((w) => w.id === wallpaper) ?? WALLPAPERS[0];

  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 overflow-hidden">
      {def.src ? (
        <div
          className="absolute inset-0 bg-cover bg-center transition-[background-image] duration-300"
          style={{ backgroundImage: `url(${def.src})` }}
        />
      ) : (
        // Opção "Gradiente": aurora abstrata estilo wallpaper oficial de macOS
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#b8c4e8_0%,#d8cfe3_35%,#c2d6d4_70%,#aab8d8_100%)] dark:bg-[linear-gradient(135deg,#141a33_0%,#2a1e40_35%,#12303a_70%,#101528_100%)]" />
      )}
      {/* Ajuste por tema: clareia no claro, escurece no escuro */}
      <div className="absolute inset-0 bg-white/15 transition-colors duration-300 dark:bg-black/55" />
      {/* Vinheta suave para ancorar as bordas */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
