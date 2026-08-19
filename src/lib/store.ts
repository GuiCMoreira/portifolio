import { create } from "zustand";
import type { AppId, WindowState } from "./types";

// Posições iniciais escalonadas para as janelas não nascerem empilhadas.
const DEFAULT_POS: Record<AppId, { x: number; y: number }> = {
  projects: { x: 110, y: 72 },
  terminal: { x: 180, y: 130 },
  about: { x: 250, y: 96 },
  contact: { x: 320, y: 150 },
};

function initialWindows(): Record<AppId, WindowState> {
  const ids: AppId[] = ["projects", "terminal", "about", "contact"];
  return Object.fromEntries(
    ids.map((appId) => [
      appId,
      {
        appId,
        open: false,
        minimized: false,
        maximized: false,
        z: 0,
        pos: DEFAULT_POS[appId],
        payload: undefined,
      } satisfies WindowState,
    ]),
  ) as Record<AppId, WindowState>;
}

interface OSStore {
  windows: Record<AppId, WindowState>;
  focused: AppId | null;
  zTop: number;
  booted: boolean;
  paletteOpen: boolean;
  openApp: (id: AppId, payload?: string) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  setPos: (id: AppId, pos: { x: number; y: number }) => void;
  clearPayload: (id: AppId) => void;
  setBooted: (b: boolean) => void;
  setPaletteOpen: (open: boolean) => void;
}

export const useOSStore = create<OSStore>((set) => ({
  windows: initialWindows(),
  focused: null,
  zTop: 1,
  booted: false,
  paletteOpen: false,

  openApp: (id, payload) =>
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: {
          ...s.windows[id],
          open: true,
          minimized: false,
          z: s.zTop + 1,
          // payload novo substitui; sem payload novo, preserva navegação atual do app
          payload: payload ?? s.windows[id].payload,
        },
      },
      zTop: s.zTop + 1,
      focused: id,
    })),

  closeApp: (id) =>
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], open: false, minimized: false, maximized: false, payload: undefined },
      },
      focused: s.focused === id ? null : s.focused,
    })),

  minimizeApp: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], minimized: true } },
      focused: s.focused === id ? null : s.focused,
    })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], maximized: !s.windows[id].maximized, z: s.zTop + 1 },
      },
      zTop: s.zTop + 1,
      focused: id,
    })),

  focusApp: (id) =>
    set((s) =>
      s.focused === id && !s.windows[id].minimized
        ? s
        : {
            windows: {
              ...s.windows,
              [id]: { ...s.windows[id], minimized: false, z: s.zTop + 1 },
            },
            zTop: s.zTop + 1,
            focused: id,
          },
    ),

  setPos: (id, pos) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], pos } },
    })),

  clearPayload: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], payload: undefined } },
    })),

  setBooted: (b) => set({ booted: b }),
  setPaletteOpen: (open) => set({ paletteOpen: open }),
}));
