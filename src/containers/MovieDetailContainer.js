"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, GlobeAltIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/solid";

export default function MovieDetailPage({ id }) {
    // // Capturo el id de la URL de manera dinámica usando useParams. El {id} corresponde al nombre del archivo [id].js, lo que me permite acceder a la película específica que quiero mostrar.
    // const { id } = useParams();

    //Defino los estados requeridos para manejar la data, el loading y el error. El estado de data se inicializa como null porque aún no tengo la información de la película, y se actualizará una vez que se haga la petición a la API.
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si por alguna razón el id todavía no está disponible, evitamos la ejecución
        if (!id) return;

        const fetchMovieDetail = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                // Petición al endpoint específico de detalle inyectando el id dinámico
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=es-ES`);

                // Guardo el objeto de la película en el estado data
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al solicitar el detalle de la película:", err);
                setError(true);
                setLoading(false);
            }
        };

        fetchMovieDetail();

    }, [id]);

    // Manejo los estados de carga y error con los componentes requeridos
    if (loading) return <LoadingMessage />;
    if (error) return <ErrorMessage />;
    if (!data) return null;

    const posterUrl = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 750'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop stop-color='%23111'/%3E%3Cstop offset='1' stop-color='%23222222'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='500' height='750' fill='url(%23g)'/%3E%3Crect x='40' y='40' width='420' height='670' rx='28' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='2'/%3E%3Cpath d='M194 238 340 375 194 512V238Z' fill='rgba(255,255,255,0.18)'/%3E%3Ctext x='50%25' y='620' fill='rgba(255,255,255,0.7)' font-family='Arial, Helvetica, sans-serif' font-size='28' text-anchor='middle'%3ESin imagen%3C/text%3E%3C/svg%3E";
    const backdropUrl = data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : null;
    const year = data.release_date ? data.release_date.split("-")[0] : "Sin fecha";
    const rating = data.vote_average ? data.vote_average.toFixed(1) : "N/A";
    const overview = data.overview?.trim() || "Sinopsis no disponible por el momento.";


    return (
        <main className="relative min-h-screen overflow-hidden bg-zinc-950 text-white">
            {backdropUrl && (
                <div className="pointer-events-none absolute inset-0">
                    <Image
                        src={backdropUrl}
                        alt={data.title}
                        fill
                        priority
                        className="object-cover opacity-25"
                    />
                </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_34%),linear-gradient(180deg,_rgba(2,6,23,0.4),_rgba(2,6,23,0.95))]" />

            <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:border-cyan-200/45 hover:bg-cyan-300/15 hover:text-cyan-50"
                >
                    <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                    Volver al inicio
                </Link>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
                    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md">
                        <div className="relative aspect-[2/3] w-full bg-zinc-900">
                            <Image
                                src={posterUrl}
                                alt={data.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </article>

                    <article className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_28px_90px_-40px_rgba(0,0,0,0.95)] backdrop-blur-md sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-100/60">Detalle de película</p>
                        <h1 className="mt-4 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl">{data.title}</h1>

                        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <InfoPill icon={CalendarDaysIcon} label="Estreno" value={year} accent="text-cyan-200" />
                            <InfoPill icon={ClockIcon} label="Duración" value={`${data.runtime || "-"} min`} accent="text-cyan-200" />
                            <InfoPill icon={StarIcon} label="Puntuación" value={rating} accent="text-amber-300" />
                            <InfoPill icon={GlobeAltIcon} label="Idioma" value={(data.original_language || "-").toUpperCase()} accent="text-cyan-200" />
                        </div>

                        <div className="mt-7 rounded-2xl border border-white/10 bg-black/35 p-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100/55">Sinopsis</p>
                            <p className="mt-3 text-sm leading-7 text-zinc-200/80 sm:text-base">{overview}</p>
                        </div>

                        <div className="mt-7 flex flex-wrap items-center gap-2">
                            {data.genres?.map((genre) => (
                                <span key={genre.id} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200/85">
                                    <SparklesIcon className="h-3.5 w-3.5 text-cyan-200" aria-hidden="true" />
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <p className="mt-7 text-sm text-zinc-300/80">
                            Estado actual: <span className="font-semibold text-white/95">{data.status || "Desconocido"}</span>
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