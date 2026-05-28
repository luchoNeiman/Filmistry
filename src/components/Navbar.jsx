const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-100/50">Filmistry</p>
          <p className="mt-1 text-sm text-white/80">Dark Glassmorphism experience</p>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          <a href="#peliculas" className="transition hover:text-white">Películas</a>
          <a href="#series" className="transition hover:text-white">Series</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar