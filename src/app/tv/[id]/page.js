"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import TvDetailContainer from "@/containers/TvDetailContainer";

export default function TvDetailPage() {
    // Capturo el id de la URL de manera dinámica usando useParams. El {id} corresponde al nombre del archivo [id].js, lo que me permite acceder a la serie específica que quiero mostrar.
    const { id } = useParams();

    return (
        <main>
            <div>
                <Link href="/">← Volver al inicio</Link>
            </div>

            <TvDetailContainer id={id} />
        </main>
    );
}