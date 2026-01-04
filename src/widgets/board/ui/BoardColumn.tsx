import type { Project } from "../../../entities/project/model/types"
import { TaskCreateForm } from "../../../features/task-create/ui/TaskCreateForm"
import { TaskItem } from "../../../features/task-item/ui/TaskItem"

type BoardColumnProps = {
  project: Project
  prevProjectId?: string
  nextProjectId?: string
}

export const BoardColumn = ({
  project,
  prevProjectId,
  nextProjectId,
}: BoardColumnProps) => {
  return (
    <section
      className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200/70 border-t-4 bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur"
      style={{ borderTopColor: project.accent }}
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Column
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            {project.name}
          </h2>
          {project.description ? (
            <p className="mt-2 text-sm text-slate-600">{project.description}</p>
          ) : null}
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {project.tasks.length} tasks
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {project.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            projectId={project.id}
            prevProjectId={prevProjectId}
            nextProjectId={nextProjectId}
          />
        ))}
        {project.tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-500">
            No tasks yet. Add the first one below.
          </div>
        ) : null}
      </div>

      <TaskCreateForm projectId={project.id} />
    </section>
  )
}
