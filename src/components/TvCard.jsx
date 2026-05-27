import Image from "next/image";
import Link from "next/link";
const TvCard = ({ TvShow }) => {
    // Desestructuramos los atributos clave que vienen de la API de TMDB para TV Show.
    const { id, name, poster_path, first_air_date, vote_average } = TvShow;

    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "https://via.placeholder.com/500x750?text=Sin+Imagen";

    // Formateo la puntuación a un decimal 
    const rating = vote_average ? vote_average.toFixed(1) : "N/A";

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col justify-between h-full">
            <div>
                {/* Contenedor de la Imagen */}
                <div className="relative aspect-[2/3] w-full bg-zinc-800">
                    <Image
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    {/* Badge de Puntuación */}
                    <div className="absolute top-2 right-2 bg-black/80 text-emerald-400 font-bold text-xs px-2 py-1 rounded-md border border-emerald-400/30">
                        ⭐ {rating}
                    </div>
                </div>

                {/* Información de la Serie */}
                <div className="p-4">
                    <h3 className="text-white font-semibold text-base line-clamp-2 min-h-[3rem]" title={name}>
                        {name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-1">
                        📺 Primera emisión: {first_air_date ? first_air_date.split("-")[0] : "Sin fecha"}
                    </p>
                </div>
            </div>

            {/* Botón de Enlace al Detalle de Serie */}
            <div className="p-4 pt-0">
                <Link
                    href={`/tv/${id}`}
                    className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors duration-200"
                >
                    Ver detalle
                </Link>
            </div>
        </div>
    )
}

export default TvCard