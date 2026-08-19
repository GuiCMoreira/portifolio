"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { useOSStore } from "@/lib/store";
import { runCommand } from "./commands";

interface HistoryEntry {
  input: string;
  output: string[];
}

const PROMPT = "guilherme@guios:~$";

export function TerminalApp() {
  const { t, lang, setLang } = useI18n();
  const openApp = useOSStore((s) => s.openApp);

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [value, setValue] = useState("");
  const [cmdIndex, setCmdIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const pastCommands = history.map((h) => h.input).filter(Boolean);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const submit = () => {
    const input = value;
    setValue("");
    setCmdIndex(-1);
    const result = runCommand(input, { lang, openApp, setLang });
    if (result === "CLEAR") {
      setHistory([]);
      return;
    }
    setHistory((h) => [...h, { input, output: result }]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const next = cmdIndex < 0 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(next);
      setValue(pastCommands[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex < 0) return;
      const next = cmdIndex + 1;
      if (next >= pastCommands.length) {
        setCmdIndex(-1);
        setValue("");
      } else {
        setCmdIndex(next);
        setValue(pastCommands[next]);
      }
    }
  };

  return (
     
    <div
      className="flex h-full cursor-text flex-col bg-black/40 p-4 font-mono text-[13px] leading-relaxed"
      onClick={() => inputRef.current?.focus()}
      role="log"
    >
      <p className="mb-3 text-text-lo">{t("terminal.welcome")}</p>

      {history.map((entry, i) => (
        <div key={i} className="mb-1">
          <div className="flex gap-2">
            <span className="shrink-0 text-emerald-400">{PROMPT}</span>
            <span className="break-all text-text-hi">{entry.input}</span>
          </div>
          {entry.output.map((line, j) => (
            <pre key={j} className="whitespace-pre-wrap text-text-hi/85">
              {line}
            </pre>
          ))}
        </div>
      ))}

      <div className="flex items-center gap-2">
        <span className="shrink-0 text-emerald-400">{PROMPT}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full bg-transparent text-text-hi caret-emerald-400 outline-none"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          aria-label="Terminal input"
           
          autoFocus
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
