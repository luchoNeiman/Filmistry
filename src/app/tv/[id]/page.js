"use client";

import { useParams } from "next/navigation";
import TvDetailContainer from "@/containers/TvDetailContainer";

export default function TvDetailPage() {
    // Capturo el id de la URL de manera dinámica usando useParams. El {id} corresponde al nombre del archivo [id].js, lo que me permite acceder a la serie específica que quiero mostrar.
    const { id } = useParams();

    return <TvDetailContainer id={id} />;
}