"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../constants/endpoints";
import MovieSection from "@/components/MovieSection";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
  // Manejo un solo estado de data como un objeto para agrupar todas las secciones
  const [data, setData] = useState({
    trending: [],
    popular: [],
    topRated: [],
    nowPlaying: [],
    upcoming: []
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        // Hago todos los pedidos a los diferentes endpoints en paralelo
        const [
          trendingRes,
          popularRes,
          topRatedRes,
          nowPlayingRes,
          upcomingRes
        ] = await Promise.all([
          axios.get(endpoints.trendingMovies),
          axios.get(endpoints.popularMovies),
          axios.get(endpoints.topRatedMovies),
          axios.get(endpoints.nowPlayingMovies),
          axios.get(endpoints.upcomingMovies)
        ]);

        // Guardo los resultados de cada endpoint en su respectiva propiedad
        setData({
          trending: trendingRes.data.results,
          popular: popularRes.data.results,
          topRated: topRatedRes.data.results,
          nowPlaying: nowPlayingRes.data.results,
          upcoming: upcomingRes.data.results
        });
        setLoading(false);

      } catch (err) {
        console.log("Error al cargar las peliculas: ", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  // Control de las vistas de estado (Cargando o Error) antes de renderizar la página
  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage />;



  return (
    <main>
      {/* BANNER LÓGICO */}
      {/* Al estar definido dentro de page.js, este banner jamás va a aparecer en las vistas de detalle */}
      <section>
        <h1>Acá irá el Banner Principal (solo visible en el inicio)</h1>
      </section>

      {/* RENDERIZADO DE SECCIONES CON LA DATA OBTENIDA */}
      <MovieSection title="Películas en tendencia" data={data.trending} type="movie" />
      <MovieSection title="Películas populares" data={data.popular} type="movie" />
      <MovieSection title="Mejor puntuadas" data={data.topRated} type="movie" />
      <MovieSection title="En cartelera" data={data.nowPlaying} type="movie" />
      <MovieSection title="Próximos estrenos" data={data.upcoming} type="movie" />
    </main>
  );
}
