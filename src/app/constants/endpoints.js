const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const endpoints = {
  // Endpoints de Películas
  trendingMovies: `${API_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES`,
  popularMovies: `${API_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`,
  topRatedMovies: `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES`,
  nowPlayingMovies: `${API_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES`,
  upcomingMovies: `${API_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES`,

  // Endpoints de Series
  popularTv: `${API_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`,
  topRatedTv: `${API_URL}/tv/top_rated?api_key=${API_KEY}&language=es-ES`,

};

// Función útil para los detalles dinámicos (para mapear las URLs con ID)
export const getDetailEndpoint = (type, id) => {
  return `${API_URL}/${type}/${id}?api_key=${API_KEY}&language=es-ES`;
};