import { useState } from 'react'
import type { FormEvent } from 'react'
import { useProjectManager } from '../hooks/useProjectManager'
import type { Project } from '../types'
import { Task } from './Task'

type ColumnProps = {
  project: Project
  prevProjectId?: string
  nextProjectId?: string
}

export const Column = ({
  project,
  prevProjectId,
  nextProjectId,
}: ColumnProps) => {
  const { addTask, deleteTask, moveTask } = useProjectManager()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) {
      return
    }
    addTask(project.id, { title, description, tag })
    setTitle('')
    setDescription('')
    setTag('')
  }

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
            <p className="mt-2 text-sm text-slate-600">
              {project.description}
            </p>
          ) : null}
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {project.tasks.length} tasks
        </span>
      </header>

      <div className="flex flex-1 flex-col gap-3">
        {project.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={() => deleteTask(project.id, task.id)}
            onMoveLeft={
              prevProjectId
                ? () => moveTask(project.id, prevProjectId, task.id)
                : undefined
            }
            onMoveRight={
              nextProjectId
                ? () => moveTask(project.id, nextProjectId, task.id)
                : undefined
            }
          />
        ))}
        {project.tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-500">
            No tasks yet. Add the first one below.
          </div>
        ) : null}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-auto flex flex-col gap-3 rounded-xl border border-slate-200/70 bg-slate-50/90 p-4"
      >
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Add task
        </label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Task title"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-amber-200"
          required
        />
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Details (optional)"
          rows={2}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-amber-200"
        />
        <div className="flex flex-wrap items-center gap-2">
          <input
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            placeholder="Tag"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-amber-200"
          />
          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  )
}
