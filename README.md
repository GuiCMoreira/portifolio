# GuiOS — Portfólio de Guilherme Carvalho

> Um portfólio que não é um site: é um **sistema operacional**.

**GuiOS** é o portfólio pessoal de [Guilherme Carvalho](https://github.com/GuiCMoreira), desenvolvedor web fullstack. No desktop, você encontra um OS completo: boot screen, janelas arrastáveis, dock, terminal interativo e command palette (⌘K). No celular, a metáfora se adapta — o site vira um smartphone, com grade de apps e telas cheias.

## Apps do sistema

| App | O que faz |
|---|---|
| **Projetos** | Navegador estilo Finder dos projetos reais (destaque: restaurant-digital, microserviços com RabbitMQ) |
| **Terminal** | Terminal funcional: `help`, `whoami`, `ls projetos`, `open <projeto>`, `neofetch`, `hire --me`… |
| **Sobre** | Bio, timeline de carreira e o painel "Sobre este Dev" (paródia do "Sobre este Mac") |
| **Contato** | GitHub, LinkedIn e e-mail |

Bilíngue **PT-BR / EN** (toggle na barra de menu, comando `lang` no terminal ou via ⌘K).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [Motion](https://motion.dev) (Framer Motion) — animações de janelas e transições
- [Zustand](https://zustand.docs.pmnd.rs) — estado do window manager
- [cmdk](https://cmdk.paco.me) — command palette
- Tipografia: Space Grotesk · Manrope · JetBrains Mono

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Qualidade

```bash
npm run lint    # ESLint
npx tsc --noEmit # typecheck
npm run build   # build de produção
```

Roteiro de QA executado em [docs/qa/](docs/qa/). Spec e plano de implementação em [docs/superpowers/](docs/superpowers/).

## Deploy

Pensado para a [Vercel](https://vercel.com): basta importar o repositório — zero configuração extra.

## Acessibilidade

- `prefers-reduced-motion` respeitado (boot, janelas, mobile)
- Navegação por teclado (dock, janelas, palette)
- Foco visível consistente
