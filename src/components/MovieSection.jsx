import MovieCard from "@/components/MovieCard";
import TvCard from "@/components/TvCard";

const MovieSection = ({ title, data }) => {
    // Si no hay datos, no renderizo la sección
    if (!data || data.length === 0) return null;

    return (
        <section>
            <h2>{title}</h2>
            <div>
                {data.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}

export default MovieSection