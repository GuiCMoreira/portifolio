# GuiOS v2 — Re-skin macOS autêntico

> Aprovado pelo Guilherme em 19/08/2026 com referência visual (print estilo macOS claro).
> Decisões: tema duplo claro/escuro (segue o sistema + toggle), wallpaper fotográfico neutro P&B, Instagram @_guic_m no dock.

**Goal:** aproximar o GuiOS de um macOS real — menu bar fiel, dock com magnification e links sociais, ícones estilo Apple, janelas claras, app Sobre no formato Notes.

## Global Constraints

- Ícones do sistema: recriações próprias em SVG (estilo Apple, sem copiar os assets originais — copyright). Marcas GitHub/LinkedIn/Instagram: glyphs oficiais para linkar perfis.
- Temas via tokens CSS (`:root` claro, `.dark` escuro) — componentes usam somente tokens semânticos, nunca cores fixas.
- Sem novas dependências de runtime.
- Portão por task: lint + tsc + build. Commits `PORTFOLIO | TIPO | DESC` na branch `feature/guios-v2-macos`.

### Task 1: Infra de tema
- `src/lib/theme.tsx`: ThemeProvider (light/dark; inicial = prefers-color-scheme; persiste em localStorage via safe-storage; aplica classe `dark` no `<html>`).
- `globals.css`: tokens semânticos duplos — `--color-desktop`, `--color-window`, `--color-window-heavy`, `--color-text-hi/lo`, `--color-fill-1/2/3` (substituem white/5..15), `--color-outline`, `--color-accent`.
- Varredura dos componentes trocando `white/N`, `black/N`, `text-hi` fixos por tokens.
- Toggle sol/lua na menu bar (e chip no mobile).

### Task 2: Ícones estilo Apple + dock macOS
- `src/components/ui/app-icons.tsx`: SVGs próprios — Finder (Projetos), Terminal, Notes (Sobre), Mail (Contato), Instagram (gradiente), reaproveita GitHub/LinkedIn.
- Dock: magnification com curva nos vizinhos (motion values + distância do mouse), separador vertical, seção social (GitHub/LinkedIn/Instagram → links), bounce ao abrir, tooltip macOS.
- Registry `apps.tsx` passa a usar os novos ícones (desktop + mobile + palette).

### Task 3: Menu bar fiel
- Esquerda: logo (maçã → "G" squircle), nome do app em bold, menus dropdown funcionais (Arquivo: abrir apps; Ajuda: comandos do terminal/⌘K).
- Direita: ícones Wi-Fi/bateria/busca(⌘K)/idioma/tema + data "qua. 19 de ago." + hora "15:42".

### Task 4: Wallpaper fotográfico
- Foto P&B (Lorem Picsum `?grayscale`, self-hosted em `/public/wallpaper.jpg`), overlay de grão CSS, vinheta; no dark, overlay escurecedor.

### Task 5: Re-skin dos apps
- Sobre → **Notes**: sidebar com notas (Sobre/Experiência/Stack), seleção amarela, data no topo, corpo em texto corrido (igual ao print).
- Projetos → Finder claro (sidebar cinza translúcida, cards brancos).
- Contato → Mail claro.
- Terminal: janela clara por fora, conteúdo escuro autêntico por dentro.
- Janela: chrome claro/escuro via tokens, sombras suaves.
- BootScreen: estilo Apple (fundo preto nos dois temas, logo + barra fina).

### Task 6: Dados + mobile + QA
- `INSTAGRAM_URL` em projects.ts; Contato ganha card Instagram.
- Mobile re-skin com novos ícones/tokens.
- Roteiro de regressão v2 (tema, dock, menus, socials) executado no browser; gates; commit.
