import { Column } from './components/Column'
import { useProjectManager } from './hooks/useProjectManager'

const App = () => {
  const { projects } = useProjectManager()
  const totalTasks = projects.reduce(
    (sum, project) => sum + project.tasks.length,
    0,
  )

  return (
    <div className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.6em] text-slate-500">
              Project Board
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
              Signal Workflow Hub
            </h1>
            <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
              Track tasks across your delivery stages with Context, useReducer,
              and a custom hook managing all logic. Add, remove, or move work
              while state stays synced to local storage.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                {projects.length} columns
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

        <main className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Column
              key={project.id}
              project={project}
              prevProjectId={projects[index - 1]?.id}
              nextProjectId={projects[index + 1]?.id}
            />
          ))}
        </main>
      </div>
    </div>
  )
}

export default App
