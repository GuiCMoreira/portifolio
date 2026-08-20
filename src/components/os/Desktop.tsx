"use client";

import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WelcomeWidget } from "./WelcomeWidget";
import { WindowLayer } from "./WindowLayer";
import { CommandPalette } from "./CommandPalette";
import { SystemDialogs } from "./SystemDialogs";

export function Desktop() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Wallpaper />
      <MenuBar />
      <WelcomeWidget />
      <WindowLayer />
      <Dock />
      <CommandPalette />
      <SystemDialogs />
    </div>
  );
}
