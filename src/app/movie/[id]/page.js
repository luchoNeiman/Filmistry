"use client";

import { useParams } from "next/navigation";
import MovieDetailContainer from "@/containers/MovieDetailContainer";

export default function MovieDetailPage() {
    const { id } = useParams();

    return <MovieDetailContainer id={id} />;
}