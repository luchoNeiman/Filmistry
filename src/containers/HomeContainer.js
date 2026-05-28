"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../constants/endpoints";
import MovieSection from "@/components/MovieSection";
import TvSection from "@/components/TvSection";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { PlayIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function Home() {
    // Manejo un solo estado de data como un objeto para agrupar todas las secciones
    const [data, setData] = useState({
        trending: [],
        popular: [],
        topRated: [],
        nowPlaying: [],
        upcoming: [],
        popularTv: [],
        topRatedTv: [],
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Hago todos los pedidos a los diferentes endpoints en paralelo
                const [
                    trendingRes,
                    popularRes,
                    topRatedRes,
                    nowPlayingRes,
                    upcomingRes,
                    popularTvRes,
                    topRatedTvRes
                ] = await Promise.all([
                    axios.get(endpoints.trendingMovies),
                    axios.get(endpoints.popularMovies),
                    axios.get(endpoints.topRatedMovies),
                    axios.get(endpoints.nowPlayingMovies),
                    axios.get(endpoints.upcomingMovies),
                    axios.get(endpoints.popularTv),
                    axios.get(endpoints.topRatedTv)
                ]);

                // Guardo los resultados de cada endpoint en su respectiva propiedad
                setData({
                    trending: trendingRes.data.results,
                    popular: popularRes.data.results,
                    topRated: topRatedRes.data.results,
                    nowPlaying: nowPlayingRes.data.results,
                    upcoming: upcomingRes.data.results,
                    popularTv: popularTvRes.data.results, // 4. Guardamos la data de series
                    topRatedTv: topRatedTvRes.data.results,
                });
                setLoading(false);

            } catch (err) {
                console.log("Error al cargar los datos: ", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    // Control de las vistas de estado (Cargando o Error) antes de renderizar la página
    if (loading) return <LoadingMessage />;
    if (error) return <ErrorMessage />;



    return (
        <main className="relative overflow-hidden bg-zinc-950 text-white">
            <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-zinc-950">
                <video
                    className="absolute inset-0 h-full w-full object-cover opacity-45 saturate-150 contrast-125"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="https://image.tmdb.org/t/p/w1280/6MCrWpYvdZgYWquOmfQK0c5tY8Z.jpg"
                >
                    <source src="https://www.w3schools.com/howto/rain.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_42%),linear-gradient(180deg,_rgba(0,0,0,0.35)_0%,_rgba(0,0,0,0.82)_100%)]" />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 py-24 text-center sm:px-10 lg:px-16">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.35em] text-cyan-100/80 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                        Cine inmersivo en estado puro
                    </div>

                    <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.75)] sm:text-7xl lg:text-[8rem]">
                        Filmistry
                    </h1>

                    <p className="mt-8 max-w-3xl text-base leading-8 text-zinc-200/80 sm:text-lg">
                        Más allá de la pantalla hay miles de historias esperando. Sumergite en nuestra colección y dejá que la próxima escena te encuentre a vos.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#peliculas"
                            className="inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300/15 px-6 py-3 text-sm font-semibold text-cyan-50 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/60 hover:bg-cyan-300/25"
                        >
                            <PlayIcon className="h-4 w-4" aria-hidden="true" />
                            Explorar películas
                        </a>
                        <a
                            href="#series"
                            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10"
                        >
                            <SparklesIcon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                            Ver series
                        </a>
                    </div>

                    <div className="mt-16 grid w-full gap-4 sm:grid-cols-3">
                        <StatCard label="Cobertura" value="TMDB" description="Catálogo vivo y dinámico" />
                        <StatCard label="Look" value="Glass" description="Cristal oscuro y blur" />
                        <StatCard label="Experiencia" value="Cinemática" description="Scroll inmersivo y foco visual" />
                    </div>
                </div>
            </section>

            <div className="relative z-10 space-y-12 px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
                <MovieSection title="Películas en tendencia" data={data.trending} type="movie" />
                <MovieSection title="Películas populares" data={data.popular} type="movie" />
                <MovieSection title="Mejor puntuadas" data={data.topRated} type="movie" />
                <MovieSection title="En cartelera" data={data.nowPlaying} type="movie" />
                <MovieSection title="Próximos estrenos" data={data.upcoming} type="movie" />

                <TvSection title="Series populares" data={data.popularTv} />
                <TvSection title="Series mejor puntuadas" data={data.topRatedTv} />
            </div>
        </main>
    );
}

function StatCard({ label, value, description }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-6 text-left shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-100/60">{label}</p>
            <p className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">{value}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300/75">{description}</p>
        </div>
    );
}
