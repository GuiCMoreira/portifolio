"use client";

import { Wallpaper } from "./Wallpaper";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { WelcomeWidget } from "./WelcomeWidget";
import { WindowLayer } from "./WindowLayer";
import { CommandPalette } from "./CommandPalette";
import { SystemDialogs } from "./SystemDialogs";
import { ContactNotification, DesktopContextMenu, WeatherWidget } from "./DesktopExtras";

export function Desktop() {
  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <Wallpaper />
      <MenuBar />
      <WelcomeWidget />
      <WeatherWidget />
      <WindowLayer />
      <Dock />
      <CommandPalette />
      <SystemDialogs />
      <ContactNotification />
      <DesktopContextMenu />
    </div>
  );
}
