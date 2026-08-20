import type { MetadataRoute } from "next";

// PWA: o GuiOS pode ser instalado como app de verdade. 😎
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GuiOS — Guilherme Carvalho",
    short_name: "GuiOS",
    description:
      "Portfólio de Guilherme Carvalho, desenvolvedor web fullstack — um sistema operacional interativo.",
    start_url: "/",
    display: "standalone",
    background_color: "#07080c",
    theme_color: "#07080c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
