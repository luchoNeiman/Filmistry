import TvCard from "./TvCard";

export default function TvSection({ title, data }) {
    // si no viene data de series, no se renderiza la sección
    if (!data || data.length === 0) return null;

    return (
        <section>
            <h2>{title}</h2>
            <div>
                {data.map((tvShow) => (
                    <TvCard key={tvShow.id} tvShow={tvShow} />
                ))}
            </div>
        </section>
    );
}