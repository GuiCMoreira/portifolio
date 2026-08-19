// Acesso a storage pode lançar SecurityError (cookies bloqueados, iframe
// sandboxed, modo privado antigo). O GuiOS degrada sem persistência em vez
// de quebrar: get devolve null, set vira no-op.

type Kind = "local" | "session";

function storage(kind: Kind): Storage {
  return kind === "local" ? window.localStorage : window.sessionStorage;
}

export function storageGet(kind: Kind, key: string): string | null {
  try {
    return storage(kind).getItem(key);
  } catch {
    return null;
  }
}

export function storageSet(kind: Kind, key: string, value: string): void {
  try {
    storage(kind).setItem(key, value);
  } catch {
    // sem persistência disponível — segue o baile
  }
}
