import TvCard from "./TvCard";

export default function TvSection({ title, data }) {
    // si no viene data de series, no se renderiza la sección
    if (!data || data.length === 0) return null;

    const sectionId = title === "Series populares" ? "series" : undefined;

    return (
        <section id={sectionId} className="space-y-5 scroll-mt-24">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-100/50">Selección curada</p>
                    <h2 className="text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">
                        {title}
                    </h2>
                </div>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-emerald-300/60 via-white/10 to-transparent lg:block" />
            </div>

            <div className="grid grid-flow-col auto-cols-[minmax(16rem,18rem)] gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] snap-x snap-mandatory lg:auto-cols-[minmax(18rem,20rem)] [&::-webkit-scrollbar]:hidden">
                {data.map((tvShow) => (
                    <div key={tvShow.id} className="snap-start">
                        <TvCard tvShow={tvShow} />
                    </div>
                ))}
            </div>
        </section>
    );
}