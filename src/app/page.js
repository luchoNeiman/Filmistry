import HomeContainer from "@/containers/HomeContainer";

export default function Home() {
  return (
    <main>
      {/* Sección exclusiva para el diseño del Banner Principal */}
      <section className="mb-12">
        <h1>Acá irá el Banner Principal (solo visible en el inicio)</h1>
      </section>

      {/* Instancio el contenedor que trae toda la lógica y las grillas */}
      <HomeContainer />
    </main>
  );
}