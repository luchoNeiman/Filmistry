"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import LoadingMessage from "../../../components/LoadingMessage";
import ErrorMessage from "../../../components/ErrorMessage";

export default function TvDetailPage() {
    // Capturo el id de la URL de manera dinámica usando useParams. El {id} corresponde al nombre del archivo [id].js, lo que me permite acceder a la serie específica que quiero mostrar.
    const { id } = useParams();

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

    // Renderizado lógico con los atributos específicos de series (TV Show)
    return (
        <main>
            {/* Nombre de la serie (usa 'name' en lugar de 'title') */}
            <h1>{data.name}</h1>

            {/* Descripción */}
            <p>Descripción: {data.overview}</p>

            {/* Fecha del primer episodio (usa 'first_air_date' en lugar de 'release_date') */}
            <p>Primera emisión: {data.first_air_date}</p>

            {/* Datos exclusivos de series */}
            <p>Cantidad de temporadas: {data.number_of_seasons}</p>
            <p>Cantidad de episodios: {data.number_of_episodes}</p>

            {/* Puntuación */}
            <p>Puntuación: {data.vote_average}</p>

            {/* Idioma original */}
            <p>Idioma original: {data.original_language}</p>

            {/* Estado de la serie */}
            <p>Estado: {data.status}</p>

            {/* Mapeo de géneros */}
            <div>
                <strong>Géneros:</strong>
                <ul>
                    {data.genres?.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>
            </div>

            {/* Ruta de imagen en texto */}
            <p>Ruta de póster: {data.poster_path}</p>
        </main>
    );
}