import { useMemo } from "react"

import { useProjectStore } from "../../../entities/project/model/store"
import { groupBy } from "../../../shared/lib/array"
import { createHashHref, useHashLocation } from "../../../shared/lib/router"
import { formatDate } from "../../../shared/lib/date"

const AnalyticsPage = () => {
  const projects = useProjectStore((state) => state.projects)
  const location = useHashLocation()

  const stats = useMemo(() => {
    const tasks = projects.flatMap((project) => project.tasks)
    const totalTasks = tasks.length
    const totalProjects = projects.length
    const averageTasks =
      totalProjects > 0 ? Math.round((totalTasks / totalProjects) * 10) / 10 : 0

    const tasksByProject = projects.map((project) => ({
      id: project.id,
      name: project.name,
      accent: project.accent,
      count: project.tasks.length,
    }))

    const tags = tasks.filter((task) => task.tag)
    const grouped = groupBy(tags, (task) => task.tag as string)
    const tagStats = Object.entries(grouped)
      .map(([tag, list]) => ({ tag, count: list.length }))
      .sort((a, b) => b.count - a.count)

    const newestTask = tasks
      .slice()
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]

    return {
      totalTasks,
      totalProjects,
      averageTasks,
      tasksByProject,
      tagStats,
      newestTask,
    }
  }, [projects])

  return (
    <div className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/85 p-8 shadow-2xl shadow-slate-200/60 backdrop-blur">
          <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-amber-200/50 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-sky-200/60 blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.6em] text-slate-500">
                  Analytics
                </p>
                <h1 className="mt-4 text-4xl font-semibold text-slate-900 md:text-5xl">
                  Flow Insights
                </h1>
                <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                  Review workload distribution, tag usage, and the newest work
                  items. This panel uses memoized selectors to keep updates
                  cheap.
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
                {stats.totalProjects} columns
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                {stats.totalTasks} tasks
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-2">
                Avg {stats.averageTasks} tasks per column
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              Tasks by column
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {stats.tasksByProject.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white p-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span className="text-sm font-semibold text-slate-800">
                      {project.name}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-500">
                    {project.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
              Tag usage
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {stats.tagStats.length > 0 ? (
                stats.tagStats.map((tag) => (
                  <div
                    key={tag.tag}
                    className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white p-3"
                  >
                    <span className="text-sm font-semibold text-slate-800">
                      {tag.tag}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">
                      {tag.count}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No tags in use.</p>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
            Latest activity
          </h2>
          {stats.newestTask ? (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {stats.newestTask.title}
                </p>
                <p className="text-sm text-slate-600">
                  Created {formatDate(stats.newestTask.createdAt)}
                </p>
              </div>
              <a
                href={createHashHref("/")}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
              >
                Back to board
              </a>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-500">No tasks yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default AnalyticsPage
