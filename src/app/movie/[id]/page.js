"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import MovieDetailContainer from "@/containers/MovieDetailContainer";

export default function MovieDetailPage() {
    const { id } = useParams();

    return (
        <main>
            <div>
                <Link href="/">← Volver al inicio</Link>
            </div>

            <MovieDetailContainer id={id} />
        </main>
    );
}