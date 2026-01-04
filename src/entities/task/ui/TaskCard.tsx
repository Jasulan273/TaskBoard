import { memo } from "react"
import type { ReactNode } from "react"

import type { TaskItem } from "../../project/model/types"
import { formatDate } from "../../../shared/lib/date"

type TaskCardProps = {
  task: TaskItem
  isEditing: boolean
  onDelete: () => void
  onEditToggle: () => void
  onMoveLeft?: () => void
  onMoveRight?: () => void
  children?: ReactNode
}

export const TaskCard = memo(
  ({
    task,
    isEditing,
    onDelete,
    onEditToggle,
    onMoveLeft,
    onMoveRight,
    children,
  }: TaskCardProps) => {
    return (
      <article className="group rounded-xl border border-slate-200/70 bg-white/90 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Task
            </p>
            <h4 className="mt-1 text-lg font-semibold text-slate-900">
              {task.title}
            </h4>
            {!isEditing ? (
              <>
                {task.description ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {task.description}
                  </p>
                ) : null}
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Created {formatDate(task.createdAt)}
                </p>
              </>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onEditToggle}
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            >
              Delete
            </button>
          </div>
        </div>

        {isEditing ? <div className="mt-3">{children}</div> : null}

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
  },
)

TaskCard.displayName = "TaskCard"
