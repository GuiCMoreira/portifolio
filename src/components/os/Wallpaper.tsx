export function Wallpaper() {
  return (
    <div aria-hidden className="grain pointer-events-none fixed inset-0 overflow-hidden">
      {/* Foto P&B (Lorem Picsum #1069) self-hosted */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/wallpaper.jpg)" }}
      />
      {/* Ajuste por tema: clareia no claro, escurece no escuro */}
      <div className="absolute inset-0 bg-white/15 transition-colors duration-300 dark:bg-black/55" />
      {/* Vinheta suave para ancorar as bordas */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
