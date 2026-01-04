import { createHashHref, useHashLocation } from "../../../shared/lib/router"

type BoardHeaderProps = {
  totalProjects: number
  totalTasks: number
}

export const BoardHeader = ({ totalProjects, totalTasks }: BoardHeaderProps) => {
  const location = useHashLocation()

  return (
    <header className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur">
      <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />
      <div className="relative flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-slate-500">
              Project Board
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
              Signal Workflow Hub
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Track tasks across delivery stages with Zustand state, instant
              edits, and local storage sync. Filter, move, and export work while
              the board stays fast and consistent.
            </p>
          </div>
          <nav className="flex gap-2 rounded-full border border-slate-200 bg-white p-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            <a
              href={createHashHref("/")}
              className={`rounded-full px-4 py-2 transition ${
                location === "/"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Board
            </a>
            <a
              href={createHashHref("/analytics")}
              className={`rounded-full px-4 py-2 transition ${
                location === "/analytics"
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Analytics
            </a>
          </nav>
        </div>
        <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
            {totalProjects} columns
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
            {totalTasks} tasks
          </span>
          <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
            Local storage sync
          </span>
        </div>
      </div>
    </header>
  )
}
