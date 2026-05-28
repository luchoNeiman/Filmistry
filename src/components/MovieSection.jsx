import MovieCard from "@/components/MovieCard";

const MovieSection = ({ title, data }) => {
    // Si no hay datos, no renderizo la sección
    if (!data || data.length === 0) return null;

    // Asigno un id específico solo a la sección de "Películas en tendencia" para el scroll desde el header. Las demás secciones no necesitan un id específico.
    const sectionId = title === "Películas en tendencia" ? "peliculas" : undefined;

    return (
        <section id={sectionId} className="space-y-5 scroll-mt-24">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-100/50">Selección curada</p>
                    <h2 className="text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
                        {title}
                    </h2>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-300/60 via-white/10 to-transparent lg:block" />
            </div>

            <div className="grid grid-flow-col auto-cols-[minmax(16rem,18rem)] gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory lg:auto-cols-[minmax(18rem,20rem)] [&::-webkit-scrollbar]:hidden">
                {data.map((movie) => (
                    <div key={movie.id} className="snap-start">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MovieSection