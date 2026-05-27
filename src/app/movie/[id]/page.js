"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import LoadingMessage from "@/components/LoadingMessage";
import ErrorMessage from "@/components/ErrorMessage";

export default function MovieDetailPage() {
    // Capturo el id de la URL de manera dinámica usando useParams. El {id} corresponde al nombre del archivo [id].js, lo que me permite acceder a la película específica que quiero mostrar.
    const { id } = useParams();

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


    return (
        <main>
            {/* Título */}
            <h1>{data.title}</h1>

            {/* Resumen o Descripción */}
            <p>Descripción: {data.overview}</p>

            {/* Fecha de estreno */}
            <p>Fecha de estreno: {data.release_date}</p>

            {/* Duración */}
            <p>Duración: {data.runtime} minutos</p>

            {/* Puntuación */}
            <p>Puntuación: {data.vote_average}</p>

            {/* Idioma original */}
            <p>Idioma original: {data.original_language}</p>

            {/* Estado de la película */}
            <p>Estado: {data.status}</p>

            {/* Mapeo lógico de la lista de géneros incorporados en el objeto */}
            <div>
                <strong>Géneros:</strong>
                <ul>
                    {data.genres?.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>
            </div>

            {/* Guardamos la ruta de la imagen en texto para validar la lógica antes de renderizarla */}
            <p>Ruta de póster: {data.poster_path}</p>
        </main>
    );
}