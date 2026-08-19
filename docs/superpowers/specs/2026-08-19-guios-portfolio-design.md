# GuiOS — Spec de Design do Portfólio

**Data:** 2026-08-19
**Autor:** Guilherme Carvalho (com Claude)
**Status:** Aprovado em brainstorming

## Visão

Portfólio pessoal de Guilherme Carvalho (Desenvolvedor Web Fullstack — Next.js, React, PHP, sistemas corporativos) apresentado como um sistema operacional interativo chamado **GuiOS**, em estética "OS Moderno" (dark, janelas de vidro estilo macOS/Raycast). Objetivo duplo: cartão de visita profissional (recrutadores/empresas) e vitrine técnica criativa. Deploy futuro na Vercel; idiomas PT-BR e EN com toggle.

O diferencial não é um efeito visual isolado, mas a coerência da metáfora: no desktop o site é um computador; no celular ele vira um smartphone do mesmo sistema.

## Escopo do lançamento (v1)

### Fluxo do visitante — desktop (≥ 768px)

1. **Boot screen**: ~2s, pulável com clique/tecla; logo GuiOS + barra de progresso com mensagens bem-humoradas ("montando /dev/carreira…"). Exibida uma vez por sessão (`sessionStorage`). Com `prefers-reduced-motion`, vira um fade simples.
2. **Desktop**: wallpaper escuro com gradiente sutil animado; menu bar no topo (logo , nome do app em foco, seletor PT/EN, relógio real); widget central de boas-vindas com nome, título e CTA "conheça meus projetos"; dock flutuante inferior com os apps.
3. **Janelas**: arrastáveis; ações maximizar/minimizar/fechar; múltiplas janelas simultâneas; foco por clique (z-index); animações de abrir/minimizar com Framer Motion.
4. **Command palette (⌘K / Ctrl+K)**: busca e executa ações — abrir apps, ir a um projeto específico, trocar idioma. Base: componente `cmdk` (ecossistema shadcn).

### Fluxo do visitante — mobile (< 768px)

- A metáfora se adapta: status bar fake (hora real, "bateria"), grade de ícones estilo home de smartphone, apps abrem em tela cheia com animação de zoom.
- Mesmo conteúdo e mesmos apps; apenas a "carcaça" muda.
- Implementação por viewport/CSS + renderização condicional; **sem** user-agent sniffing.

### Apps (4)

| App | Metáfora | Conteúdo |
|---|---|---|
| **Projetos** | Finder | Sidebar com categorias (Destaques, Web, Mobile); grid de projetos; visão de detalhe com descrição, badges de stack, screenshots (quando houver) e links GitHub/demo. `restaurant-digital` (Next.js + microserviços + RabbitMQ) é o destaque principal. Demais: devroast, controle-chamados, fsw-barber, Eccomerce-PHP e outros a curar de github.com/GuiCMoreira. |
| **Terminal** | Terminal real | Comandos: `help`, `whoami`, `ls projetos`, `open <projeto>` (abre o app Projetos no item), `stack`, `neofetch` (ASCII art + specs), `carreira`, `hire --me` (abre Contato), `clear`. Histórico com ↑/↓. Comando desconhecido: mensagem amigável sugerindo `help` — nunca quebra. |
| **Sobre** | Perfil + "Sobre este Dev" | Bio, timeline de carreira e painel paródia do "Sobre este Mac": Processador = "Cérebro movido a café", Memória = stack (Next.js, React, TypeScript, PHP, MySQL, Docker…), Armazenamento = anos de experiência. |
| **Contato** | Mail | Cards para GitHub (github.com/GuiCMoreira), LinkedIn (linkedin.com/in/guilherme-de-carvalho-moreira) e e-mail via `mailto:`. Sem formulário na v1 (evita backend). |

## Arquitetura técnica

### Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion**.
- Componentes visuais pontuais de reactbits / cult-ui / skiper-ui / 21st.dev **copiados e adaptados para o repositório** (essas bibliotecas são copy-paste por design), nunca instalados como dependência de runtime.
- Deploy alvo: Vercel.

### Decisões estruturais

- **Estado do OS**: store Zustand única e pequena (`useOSStore`): lista de janelas abertas, janela em foco, minimizadas, posições/tamanhos. A UI nunca guarda estado de janela no DOM.
- **Registry de apps**: cada app se declara em `data/apps.ts` como `{ id, ícone, título (i18n), componente }`. Desktop, dock, mobile home e command palette leem do registry — adicionar um app novo no futuro toca 1 arquivo de dados + 1 componente.
- **Conteúdo 100% em `src/data/`** (`projects.ts`, `career.ts`): sem CMS. Editar portfólio = editar TypeScript tipado.
- **i18n próprio e leve**: dicionários PT/EN em TS + React Context; persistência em `localStorage`; primeira visita detecta `navigator.language`. Sem biblioteca de i18n nem rotas por idioma — o site é uma "aplicação" de página única.
- **SEO**: metadata completa (title, description, OpenGraph) no layout; conteúdo textual dos apps presente no DOM para crawlers.
- **Acessibilidade**: `prefers-reduced-motion` respeitado em boot e janelas; navegação por teclado no dock, janelas e apps; contraste adequado no tema escuro.

### Estrutura de pastas

```
src/
  app/                 # layout.tsx (metadata/fonts), page.tsx
  components/os/       # BootScreen, Desktop, MenuBar, Dock, Window, WindowManager, CommandPalette
  components/apps/     # projects/, terminal/, about/, contact/
  components/mobile/   # MobileHome, MobileAppShell, StatusBar
  components/ui/       # shadcn/ui + componentes adaptados de terceiros
  data/                # projects.ts, career.ts, apps.ts (registry)
  lib/                 # i18n.ts(x), store.ts, hooks/
```

## Tratamento de erros

- Terminal nunca lança exceção para input do usuário; todo comando desconhecido devolve resposta amigável.
- Janela cujo app falhe ao renderizar mostra conteúdo de fallback dentro da própria janela (error boundary por janela), sem derrubar o desktop.
- Imagens de projetos ausentes caem em placeholder estilizado do GuiOS.

## Verificação e qualidade

- Portão mínimo por fase: `lint` + `typecheck` + `build` verdes.
- Teste manual roteirizado no browser ao final de cada fase (desktop e mobile), com roteiro salvo em arquivo antes da execução.
- E2E automatizado (Playwright): fora da v1; considerar se o projeto crescer.

## Fora de escopo (v1)

- Formulário de contato com backend/e-mail transacional.
- Blog, CMS, analytics.
- Estilos alternativos de OS (retrô CRT etc.) e temas claros.
- Sons do sistema.
- E2E automatizado.

## Riscos e mitigações

- **Metáfora atrapalhar recrutador apressado**: o widget de boas-vindas e o dock deixam os 4 apps visíveis e a 1 clique; command palette e terminal são atalhos, nunca o único caminho.
- **Peso de animações**: Framer Motion com animações curtas e GPU-friendly; `prefers-reduced-motion` como corte global.
- **Conteúdo dos projetos raso**: curadoria inicial dos repositórios reais do GitHub com descrições escritas à mão em PT/EN (placeholders claramente marcados onde faltar material).
