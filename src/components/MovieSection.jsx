import MovieCard from "@/components/MovieCard";
import TvCard from "@/components/TvCard";

const MovieSection = ({ title, data, type = "movie" }) => {
    // Si no hay datos, no renderizo la sección
    if (!data || data.length === 0) return null;

    return (
        <section className="mb-12">
            {/* Título de la sección */}
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-2">
                {title}
            </h2>

            {/* Grilla responsive ordenada */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {data.map((item) => (
                    type === "movie" ? (
                        <MovieCard key={item.id} movie={item} />
                    ) : (
                        <TvCard key={item.id} tvShow={item} />
                    )
                ))}
            </div>
        </section>
    )
}

export default MovieSection