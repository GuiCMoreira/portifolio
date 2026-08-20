# Changelog

## [1.0.0] — 2026-08-19

### GuiOS v1 — lançamento inicial

- **Desktop OS**: boot screen pulável (1x por sessão), wallpaper com auroras discretas, menu bar (app focado, idioma, relógio), dock com tiles em gradiente e indicadores de app aberto.
- **Window manager**: janelas arrastáveis com foco por clique (z-index), minimizar/restaurar, maximizar (botão e double-click), fechar; error boundary por janela.
- **App Projetos**: navegador estilo Finder com categorias (Destaques/Web/Mobile/Todos), detalhe com highlights, stack e links; deep-link via terminal e palette.
- **App Terminal**: comandos help, whoami, ls projetos, open, stack, carreira, neofetch, hire --me, lang, clear, sudo (easter egg), exit (easter egg); histórico com ↑/↓.
- **App Sobre**: bio, timeline de carreira, painel "Sobre este Dev".
- **App Contato**: GitHub, LinkedIn, e-mail.
- **Command palette (⌘K/Ctrl+K)**: apps, projetos e ações de sistema.
- **Mobile**: experiência de smartphone OS — status bar, grade de apps, apps em tela cheia.
- **i18n**: PT-BR/EN com detecção automática e persistência.
- **A11y/SEO**: prefers-reduced-motion, foco visível, metadata OpenGraph completa, favicon próprio.
- **QA**: roteiro com 32 cenários executados — 32 PASS.

## [2.0.0] — 2026-08-20

### Re-skin macOS autêntico

- **Tema duplo**: claro e escuro, seguindo a preferência do sistema, com toggle na menu bar (e no mobile). Tokens semânticos de cor em todo o app.
- **Menu bar fiel ao macOS**: logo, nome do app em negrito, menus "Arquivo" e "Ajuda" funcionais, Wi-Fi/bateria/busca, data e hora no formato do Mac.
- **Dock estilo macOS**: efeito magnification com vizinhança, separador vertical, bounce ao abrir e tooltips; ícones de GitHub, LinkedIn e Instagram para acesso rápido.
- **Ícones estilo Apple**: Finder (Projetos), Terminal, Notes (Sobre) e Mail (Contato) — recriações próprias em SVG.
- **Sobre virou Notes**: sidebar de notas com seleção amarela (Sobre, Experiência, Stack & specs).
- **Wallpaper fotográfico** P&B com grão (self-hosted), clareado/escurecido conforme o tema.
- **Contato** ganhou card do Instagram.

## [2.1.0] — 2026-08-20

### Safari.app 🧭

- Novo app **Safari**: barra de endereço com histórico real (voltar/avançar/recarregar), start page de favoritos e atalhos para os projetos em destaque.
- **GitHub renderizado**: digitar github.com (ou clicar no favorito) mostra o perfil real do Gui via API pública — avatar, bio, seguidores e repositórios recentes com linguagem e stars (cache de sessão).
- **Sites com iframe liberado** carregam dentro do navegador; sites que bloqueiam embed (LinkedIn, Instagram etc.) mostram página de bloqueio estilo Safari com botão "Abrir em nova aba".
- Preparado para rodar demos dos projetos embutidas quando forem hospedadas.
- Ícone de bússola estilo macOS; no mobile o Safari entra na grade da home.
