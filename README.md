# Filmistry - TP3 App de Películas y Series

## Descripción

Filmistry es una aplicación web enfocada en el consumo de APIs externas desde componentes _client-side_. Desarrollada para la materia de Programación 3, la plataforma se conecta con la API de The Movie Database (TMDB) para explorar el catálogo de películas y series. Permite a los usuarios visualizar diferentes categorías (tendencias, populares, en cartelera, entre otras) de manera ordenada en una interfaz responsive y dinámica.

## Tecnologías utilizadas

- **Next.js** (App Router, Client Components)
- **React** (`useState`, `useEffect`)
- **JavaScript**
- **Axios** (para el manejo de peticiones HTTP)
- **Tailwind CSS** (para el estilizado y diseño responsive)

## Instrucciones de instalación

1. Clonar el repositorio en tu máquina local:

```bash
git clone <url-de-tu-repositorio>

```

2. Acceder al directorio del proyecto:

```bash
cd filmistry

```

3. Instalar las dependencias requeridas:

```bash
npm install

```

_(También se puede utilizar `yarn install`)_ 

4. Configurar las variables de entorno. Crear el archivo `.env.local` y agregar tu API Key de TMDB:

```env
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_aqui

```

## Instrucciones para ejecutar el proyecto

Una vez instaladas las dependencias y configurada la API Key, iniciar el servidor de desarrollo con:

```bash
yarn dev

```

_(O alternativamente `npm run dev`)_

La aplicación estará disponible y corriendo en [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## Endpoints utilizados

El proyecto consume los siguientes endpoints de la API v3 de TMDB (`https://api.themoviedb.org/3`):

**Películas:**

- **Tendencias del día:** `/trending/movie/day`
- **Populares:** `/movie/popular`
- **Mejor puntuadas:** `/movie/top_rated`
- **En cartelera:** `/movie/now_playing`
- **Próximos estrenos:** `/movie/upcoming`
- **Detalle de película:** `/movie/{movie_id}`

**Series (TV Shows):**

- **Populares:** `/tv/popular`
- **Mejor puntuadas:** `/tv/top_rated`
- **Detalle de serie:** `/tv/{series_id}`

## Capturas de pantalla

_(Nota: Reemplazá estas rutas por las imágenes reales de tu aplicación una vez que termines el diseño)_

_Vista principal con las grillas de películas por categoría._

_Vista de detalle dinámico de una película seleccionada._

## Declaración de uso de IA

Para el desarrollo de este trabajo práctico se utilizó Inteligencia Artificial como herramienta de asistencia técnica para algunos casos. Su uso se enfocó principalmente en la simplificación del código.

Un caso de uso destacado fue la implementación de `Promise.all` en la página principal para ejecutar múltiples peticiones asíncronas de Axios a los diferentes endpoints de TMDB de manera concurrente, en lugar de secuencial. Esto permitió optimizar la carga de los estados y mejorar significativamente el rendimiento al momento de renderizar las distintas secciones de películas.
