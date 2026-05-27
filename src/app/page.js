"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../constants/endpoints";
import MovieSection from "@/components/MovieSection";
import TvSection from "@/components/TvSection";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";

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
    <main>
      <section>
        <h1>Acá irá el Banner Principal (solo visible en el inicio)</h1>
      </section>

      {/* Renderizado lógico de Películas */}
      <MovieSection title="Películas en tendencia" data={data.trending} type="movie" />
      <MovieSection title="Películas populares" data={data.popular} type="movie" />
      <MovieSection title="Mejor puntuadas" data={data.topRated} type="movie" />
      <MovieSection title="En cartelera" data={data.nowPlaying} type="movie" />
      <MovieSection title="Próximos estrenos" data={data.upcoming} type="movie" />

      {/* 5. Renderizado lógico de Series */}
      <TvSection title="Series populares" data={data.popularTv} />
      <TvSection title="Series mejor puntuadas" data={data.topRatedTv} />
    </main>
  );
}
