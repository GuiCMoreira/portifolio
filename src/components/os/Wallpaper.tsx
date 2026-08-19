export function Wallpaper() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-ink">
      {/* auroras: atmosfera discreta, nunca protagonistas */}
      <div
        className="aurora-a absolute -top-1/4 left-[10%] h-[70vh] w-[55vw] rounded-full opacity-[0.14]"
        style={{
          background: "radial-gradient(ellipse at center, #4a55a8 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="aurora-b absolute -bottom-1/3 right-[5%] h-[65vh] w-[45vw] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(ellipse at center, #14646b 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />
      {/* vinheta para ancorar as bordas */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
