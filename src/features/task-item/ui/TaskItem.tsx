import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { useShallow } from "zustand/shallow"

import type { TaskItem as TaskItemType } from "../../../entities/project/model/types"
import { useProjectStore } from "../../../entities/project/model/store"
import { TaskCard } from "../../../entities/task/ui/TaskCard"

type TaskItemProps = {
  projectId: string
  task: TaskItemType
  prevProjectId?: string
  nextProjectId?: string
}

export const TaskItem = ({
  projectId,
  task,
  prevProjectId,
  nextProjectId,
}: TaskItemProps) => {
  const { deleteTask, moveTask, updateTask } = useProjectStore(
    useShallow((state) => ({
      deleteTask: state.deleteTask,
      moveTask: state.moveTask,
      updateTask: state.updateTask,
    })),
  )

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? "")
  const [tag, setTag] = useState(task.tag ?? "")

  useEffect(() => {
    setTitle(task.title)
    setDescription(task.description ?? "")
    setTag(task.tag ?? "")
  }, [task])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const updated = updateTask(projectId, task.id, {
      title,
      description,
      tag,
    })
    if (updated) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTitle(task.title)
    setDescription(task.description ?? "")
    setTag(task.tag ?? "")
    setIsEditing(false)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel()
    } else {
      setIsEditing(true)
    }
  }

  return (
    <TaskCard
      task={task}
      isEditing={isEditing}
      onEditToggle={handleEditToggle}
      onDelete={() => deleteTask(projectId, task.id)}
      onMoveLeft={
        prevProjectId
          ? () => moveTask(projectId, task.id, prevProjectId)
          : undefined
      }
      onMoveRight={
        nextProjectId
          ? () => moveTask(projectId, task.id, nextProjectId)
          : undefined
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
          >
            Save
          </button>
        </div>
      </form>
    </TaskCard>
  )
}
