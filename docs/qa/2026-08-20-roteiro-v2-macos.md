# Roteiro de QA — GuiOS v2 (re-skin macOS)

**Data:** 2026-08-20 · **Build:** feature/guios-v2-macos · **Ambiente:** dev server :3002, Chrome via DevTools MCP

| # | Cenário | Resultado esperado | Status |
|---|---------|--------------------|--------|
| V1 | Tema claro | Wallpaper P&B com grão, janelas brancas, menu bar clara | PASS — screenshot 1440x900 conferido com o print de referência |
| V2 | Tema escuro | Mesmo layout, superfícies escuras, wallpaper escurecido | PASS — screenshot conferido |
| V3 | Toggle de tema | Botão lua/sol na menu bar troca e persiste | PASS — dark→light, localStorage guios.theme=light |
| V4 | Dock: ícones Apple-style | Finder, Terminal, Notes, Mail em squircles | PASS — element screenshot do Finder conferido após correção do path |
| V5 | Dock: socials | GitHub, LinkedIn, Instagram após separador, com hrefs corretos | PASS — snapshot a11y mostra links com URLs corretas (inclui instagram.com/_guic_m) |
| V6 | Menu Arquivo | Dropdown com os 4 apps + Fechar janela; itens abrem apps | PASS — "Sobre" abriu pela lista |
| V7 | Menu Ajuda | Busca rápida abre ⌘K; itens Terminal/Contato presentes | PASS — palette abriu |
| V8 | Menu bar direita | Wi-Fi, bateria, busca, idioma, tema, data e hora formato macOS | PASS — "qua., 19 de ago. 23:58" |
| V9 | Sobre = Notes | Sidebar de notas com seleção amarela, data no topo, corpo em parágrafos | PASS — 3 notas (Sobre/Experiência/Stack & specs) |
| V10 | Mobile | Fundo opaco no app aberto, notas em chips horizontais, ícones novos na grade | PASS — screenshot 390x844 após fix de transparência |
| V11 | Portões | lint + tsc + build | PASS |

**Correções durante o QA:** path do lado direito do ícone Finder (renderizava deformado); fundo translúcido do MobileAppView (home vazava) → token --window-solid; sidebar do Notes em telas estreitas → chips horizontais.

**Resultado: 11/11 PASS.**

## Regressão — bugs reportados pelo Guilherme (20/08)

| # | Bug | Fix | Evidência |
|---|-----|-----|-----------|
| B1 | Fundo escuro do terminal quebrava com scroll | `h-full` → `min-h-full` no container do terminal | darkHeight 976 = scrollHeight 976; screenshot com scroll no meio, fundo íntegro |
| B2a | Maximizar não ocupava a tela toda | Janela maximizada vira `fixed inset-0` (z acima de menu bar/dock), sem max-width/height | getBoundingClientRect 0,0,1440x956 = viewport |
| B2b | Janelas translúcidas vazavam conteúdo de trás | Nova classe `.window-surface` com fundo sólido (`--window-solid`: #f5f5f7 / #1e1f24); removida opacidade de janela desfocada | Screenshots claro/escuro sem vazamento |
| B3 | Vidro fora do tom Apple | Dock/menu bar/dropdowns/palette com tratamento Liquid Glass: blur 36-40px, saturate 1.9, highlight interno superior | Screenshots conferidos nos 2 temas |

Observação: um frame com janela desfocada "clara" no tema escuro apareceu 1x durante o QA e não reproduziu (glitch de compositing do Chrome headless durante animação de tema; computed style estava correto).

## Regressão — rework do drag de janelas (20/08, noite)

Bug reportado: janelas tremiam durante o arrasto e, ao soltar, reanimavam da posição original até o ponto de soltura.

Causa raiz: prop `layout` do Motion (usada para animar a maximização) reanimava a mudança de left/top que o commit do drag fazia ao soltar; além disso, `dragConstraints` por ref auto-ajustava x/y quando a janela mudava de tamanho, e alternar a prop `drag` no maximizar reinicializava o gesto com valores sujos.

Fix: geometria 100% em motion values com canais separados (x/y exclusivos do drag; tx/ty/w/h/radius exclusivos da maximização, animados imperativamente com alvo medido do DOM); `drag` sempre ativo; sem `dragConstraints` — clamp próprio no fim do gesto (estilo macOS: janela sai pelas laterais, título nunca some).

| Cenário | Evidência |
|---|---|
| Soltar = posição cravada, sem replay | amostragem 400ms pós-soltura: 1 única posição (290,224), deslocamento exato +180/+120 |
| 3 drags encadeados | posição final exata (210,224) |
| Maximizar após drags | left=0, top=32 (menu bar), largura=viewport, base no topo do dock |
| Restaurar | volta ao pixel da posição arrastada |
| Drag pós-restauro | delta exato 50,40 |
| Clamp de topo | drag de -600px em y parou na borda da menu bar |
| Fechar/reabrir/maximizar | posição persistida e maximização íntegra |

## Resize de janelas (20/08, noite)

8 alças (4 bordas + 4 cantos) com pointer events puros sobre os motion values. Regressão: leste +120 ✓ · sul +80 ✓ · oeste (w+100, x−100) ✓ · norte (h+60, y−60) ✓ · canto SE −250/−200 ✓ · mínimo 320×220 ✓ · drag pós-resize ✓ · maximizar/restaurar volta ao tamanho custom ✓ · tamanho persiste ao fechar/reabrir ✓.
