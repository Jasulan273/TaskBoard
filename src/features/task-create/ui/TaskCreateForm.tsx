import { useState } from "react"
import type { FormEvent } from "react"
import { useShallow } from "zustand/shallow"

import { useProjectStore } from "../../../entities/project/model/store"

type TaskCreateFormProps = {
  projectId: string
}

export const TaskCreateForm = ({ projectId }: TaskCreateFormProps) => {
  const { addTask } = useProjectStore(
    useShallow((state) => ({
      addTask: state.addTask,
    })),
  )

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const saved = addTask(projectId, { title, description, tag })
    if (!saved) {
      return
    }
    setTitle("")
    setDescription("")
    setTag("")
  }

  return (
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
  )
}
