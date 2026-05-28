"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { ArrowLeftIcon, CalendarDaysIcon, FilmIcon, GlobeAltIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/solid";

export default function TvDetailPage({ id }) {
    // // Capturo el id de la URL de manera dinámica usando useParams. El {id} corresponde al nombre del archivo [id].js, lo que me permite acceder a la serie específica que quiero mostrar.
    // const { id } = useParams();

    // Estados requeridos
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchTvDetail = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

                // Petición al endpoint de TV con el id dinámico
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=es-ES`
                );

                // Guardo los datos de la serie
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al solicitar el detalle de la serie:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchTvDetail();
    }, [id]);

    // Manejo lógico de vistas de carga y error
    if (loading) return <LoadingMessage />;
    if (error) return <ErrorMessage />;
    if (!data) return null;

    const posterUrl = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 750'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%230f172a'/%3E%3Cstop offset='1' stop-color='%230a0a0a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='750' fill='url(%23g)'/%3E%3Crect x='40' y='40' width='420' height='670' rx='28' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='2'/%3E%3Cpath d='M210 244h80v40h-24l24 28-18 18-32-37v37h-30V244Zm4 100h72v20h-72v-20Z' fill='rgba(255,255,255,0.2)'/%3E%3Ctext x='50%25' y='620' fill='rgba(255,255,255,0.7)' font-family='Arial, Helvetica, sans-serif' font-size='28' text-anchor='middle'%3ESin imagen%3C/text%3E%3C/svg%3E";
    const backdropUrl = data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : null;
    const year = data.first_air_date ? data.first_air_date.split("-")[0] : "Sin fecha";
    const rating = data.vote_average ? data.vote_average.toFixed(1) : "N/A";
    const overview = data.overview?.trim() || "Sinopsis no disponible por el momento.";

    // Renderizado lógico con los atributos específicos de series (TV Show)
    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
            {backdropUrl && (
                <div className="pointer-events-none absolute inset-0">
                    <Image
                        src={backdropUrl}
                        alt={data.name}
                        fill
                        priority
                        className="object-cover opacity-25"
                    />
                </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_34%),linear-gradient(180deg,_rgba(2,6,23,0.4),_rgba(2,6,23,0.95))]" />

            <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-emerald-200/45 hover:bg-emerald-300/15 hover:text-emerald-50"
                >
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                    Volver al inicio
                </Link>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
                    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md">
                        <div className="relative aspect-[2/3] w-full bg-zinc-900">
                            <Image
                                src={posterUrl}
                                alt={data.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </article>

                    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-100/60">Detalle de serie</p>
                        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">{data.name}</h1>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <InfoPill icon={CalendarDaysIcon} label="Primer año" value={year} accent="text-emerald-200" />
                            <InfoPill icon={FilmIcon} label="Temporadas" value={`${data.number_of_seasons || "-"}`} accent="text-emerald-200" />
                            <InfoPill icon={StarIcon} label="Puntuación" value={rating} accent="text-amber-300" />
                            <InfoPill icon={GlobeAltIcon} label="Idioma" value={(data.original_language || "-").toUpperCase()} accent="text-emerald-200" />
                        </div>

                        <div className="mt-7 rounded-2xl border border-white/10 bg-black/35 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100/55">Sinopsis</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-200/80 sm:text-base">{overview}</p>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center gap-2">
                            {data.genres?.map((genre) => (
                                <span key={genre.id} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200/85">
                                    <SparklesIcon className="h-3.5 w-3.5 text-emerald-200" aria-hidden="true" />
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="mt-7 text-sm text-zinc-300/80">
                            Estado actual: <span className="font-semibold text-white/95">{data.status || "Desconocido"}</span>
                        </p>
                        <p className="mt-1 text-sm text-zinc-300/80">
                            Episodios disponibles: <span className="font-semibold text-white/95">{data.number_of_episodes || "-"}</span>
                        </p>
                    </article>
                </div>
            </section>
        </main>
    );
}

function InfoPill({ icon: Icon, label, value, accent }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-black/35 px-4 py-3">
            <p className="text-[0.68rem] uppercase tracking-[0.25em] text-zinc-300/60">{label}</p>
            <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                <Icon className={`h-4 w-4 ${accent}`} aria-hidden="true" />
                {value}
            </p>
        </div>
    );
}