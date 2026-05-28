const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/70 px-6 py-8 text-center text-sm text-zinc-400 backdrop-blur-xl sm:px-10 lg:px-16">
      <p>&copy; {new Date().getFullYear()} Luciano Neiman · Filmistry · TMDB visual showcase</p>
    </footer>
  )
}

export default Footer