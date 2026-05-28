import { FilmIcon } from "@heroicons/react/24/solid";

const LoadingMessage = () => {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-zinc-950 px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.12),_transparent_30%)]" />

      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_100px_-36px_rgba(0,0,0,0.95)] backdrop-blur-xl">
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />

        <div className="flex flex-col items-center text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-cyan-300/20" />
            <div className="absolute inset-2 rounded-full border border-cyan-300/30 border-t-cyan-200 animate-spin" />
            <div className="absolute inset-5 rounded-full border border-white/10" />
            <div className="absolute inset-7 rounded-full bg-cyan-300/10 blur-xl" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-cyan-200/20 bg-black/40 backdrop-blur-md">
              <FilmIcon className="h-6 w-6 text-cyan-200" aria-hidden="true" />
            </div>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.38em] text-cyan-100/55">
            Filmistry
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-[-0.05em] text-white">
            Cargando catálogo
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-300/75">
            Preparando películas y series para que la experiencia entre con el mismo ritmo que la portada.
          </p>

          <div className="mt-8 w-full space-y-3">
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-cyan-300/50 via-cyan-200 to-white/80" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded-2xl border border-white/8 bg-white/5 animate-pulse" />
              <div className="h-16 rounded-2xl border border-white/8 bg-white/5 animate-pulse [animation-delay:120ms]" />
              <div className="h-16 rounded-2xl border border-white/8 bg-white/5 animate-pulse [animation-delay:240ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;
