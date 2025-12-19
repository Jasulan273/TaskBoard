import type { TaskItem } from '../types'

type TaskProps = {
  task: TaskItem
  onDelete: () => void
  onMoveLeft?: () => void
  onMoveRight?: () => void
}

export const Task = ({
  task,
  onDelete,
  onMoveLeft,
  onMoveRight,
}: TaskProps) => {
  return (
    <article className="group rounded-xl border border-slate-200/70 bg-white/90 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-slate-900">
            {task.title}
          </h4>
          {task.description ? (
            <p className="mt-2 text-sm text-slate-600">{task.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
        >
          Delete
        </button>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {task.tag ? (
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100">
            {task.tag}
          </span>
        ) : null}
        <div className="ml-auto flex gap-2 text-xs font-semibold uppercase tracking-wide">
          <button
            type="button"
            onClick={onMoveLeft}
            disabled={!onMoveLeft}
            className="rounded-lg border border-slate-200 px-2 py-1 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onMoveRight}
            disabled={!onMoveRight}
            className="rounded-lg border border-slate-200 px-2 py-1 text-slate-500 transition hover:border-slate-300 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </article>
  )
}
