import { create } from "zustand";
import type { AppId, WindowState } from "./types";

// Posições iniciais escalonadas para as janelas não nascerem empilhadas.
const DEFAULT_POS: Record<AppId, { x: number; y: number }> = {
  projects: { x: 110, y: 72 },
  safari: { x: 150, y: 60 },
  terminal: { x: 180, y: 130 },
  about: { x: 250, y: 96 },
  contact: { x: 320, y: 150 },
};

function initialWindows(): Record<AppId, WindowState> {
  const ids: AppId[] = ["projects", "safari", "terminal", "about", "contact"];
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
        size: null,
        payload: undefined,
      } satisfies WindowState,
    ]),
  ) as Record<AppId, WindowState>;
}

// Ao fechar/minimizar a focada, promove a janela visível de maior z.
function nextFocus(windows: Record<AppId, WindowState>, closing: AppId): AppId | null {
  const candidates = Object.values(windows).filter(
    (w) => w.appId !== closing && w.open && !w.minimized,
  );
  if (candidates.length === 0) return null;
  return candidates.reduce((top, w) => (w.z > top.z ? w : top)).appId;
}

export type PowerState = "on" | "sleep" | "off";
export type SystemDialog = "about" | "settings" | "trash" | null;

interface OSStore {
  windows: Record<AppId, WindowState>;
  focused: AppId | null;
  zTop: number;
  booted: boolean;
  paletteOpen: boolean;
  powerState: PowerState;
  systemDialog: SystemDialog;
  /** últimos apps abertos na sessão (mais recente primeiro) */
  recent: AppId[];
  openApp: (id: AppId, payload?: string) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focusApp: (id: AppId) => void;
  setPos: (id: AppId, pos: { x: number; y: number }) => void;
  setSize: (id: AppId, size: { w: number; h: number }) => void;
  clearPayload: (id: AppId) => void;
  setBooted: (b: boolean) => void;
  setPaletteOpen: (open: boolean) => void;
  setPowerState: (s: PowerState) => void;
  setSystemDialog: (d: SystemDialog) => void;
  closeAll: () => void;
}

export const useOSStore = create<OSStore>((set) => ({
  windows: initialWindows(),
  focused: null,
  zTop: 1,
  booted: false,
  paletteOpen: false,
  powerState: "on",
  systemDialog: null,
  recent: [],

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
      recent: [id, ...s.recent.filter((r) => r !== id)].slice(0, 4),
    })),

  closeApp: (id) =>
    set((s) => ({
      windows: {
        ...s.windows,
        [id]: { ...s.windows[id], open: false, minimized: false, maximized: false, payload: undefined },
      },
      focused: s.focused === id ? nextFocus(s.windows, id) : s.focused,
    })),

  minimizeApp: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], minimized: true } },
      focused: s.focused === id ? nextFocus(s.windows, id) : s.focused,
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

  setSize: (id, size) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], size } },
    })),

  clearPayload: (id) =>
    set((s) => ({
      windows: { ...s.windows, [id]: { ...s.windows[id], payload: undefined } },
    })),

  setBooted: (b) => set({ booted: b }),
  setPaletteOpen: (open) => set({ paletteOpen: open }),
  setPowerState: (s) => set({ powerState: s }),
  setSystemDialog: (d) => set({ systemDialog: d }),

  closeAll: () =>
    set(() => ({ windows: initialWindows(), focused: null })),
}));
