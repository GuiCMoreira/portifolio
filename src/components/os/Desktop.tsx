"use client";

import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WelcomeWidget } from "./WelcomeWidget";

export function Desktop() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Wallpaper />
      <MenuBar />
      <WelcomeWidget />
      <Dock />
    </div>
  );
}
