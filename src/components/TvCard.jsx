import Image from "next/image";
import Link from "next/link";
import { StarIcon, CalendarDaysIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
const TvCard = ({ tvShow }) => {
    // Desestructuramos los atributos clave que vienen de la API de TMDB para TV Show.
    const { id, name, poster_path, first_air_date, vote_average } = tvShow;

    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 750'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%230f172a'/%3E%3Cstop offset='1' stop-color='%230a0a0a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='750' fill='url(%23g)'/%3E%3Crect x='40' y='40' width='420' height='670' rx='28' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='2'/%3E%3Cpath d='M210 244h80v40h-24l24 28-18 18-32-37v37h-30V244Zm4 100h72v20h-72v-20Z' fill='rgba(255,255,255,0.2)'/%3E%3Ctext x='50%25' y='620' fill='rgba(255,255,255,0.7)' font-family='Arial, Helvetica, sans-serif' font-size='28' text-anchor='middle'%3ESin imagen%3C/text%3E%3C/svg%3E";

    // Formateo la puntuación a un decimal 
    const rating = vote_average ? vote_average.toFixed(1) : "N/A";

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.95)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:border-emerald-300/40 hover:shadow-[0_24px_90px_-24px_rgba(16,185,129,0.22)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_45%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-900">
                <Image
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={500}
                    height={750}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-black/55 px-3 py-1.5 text-xs font-semibold text-emerald-200 backdrop-blur-md">
                    <StarIcon className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                    {rating}
                </div>
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/45 p-3 backdrop-blur-md">
                    <p className="text-[0.7rem] uppercase tracking-[0.32em] text-emerald-100/60">Primera emisión</p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm text-white/80">
                        <CalendarDaysIcon className="h-4 w-4 text-emerald-200" aria-hidden="true" />
                        {first_air_date ? first_air_date.split("-")[0] : "Sin fecha"}
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <div>
                    <h3 className="line-clamp-2 text-balance text-lg font-bold leading-tight text-white" title={name}>
                        {name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300/70">
                        Una tarjeta pensada para una lectura nocturna, con énfasis en la portada y una jerarquía más limpia.
                    </p>
                </div>

                <Link
                    href={`../tv/${id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/90 transition duration-300 hover:border-emerald-200/40 hover:bg-emerald-300/15 hover:text-emerald-50"
                >
                    Ver detalle
                    <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                </Link>
            </div>
        </article>
    )
}

export default TvCard