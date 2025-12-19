import { useCallback } from 'react'
import { useProjectContext } from '../context/ProjectContext'
import type { TaskItem } from '../types'

type NewTaskInput = {
  title: string
  description?: string
  tag?: string
}

const createId = (prefix: string) => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useProjectManager = () => {
  const { state, dispatch } = useProjectContext()

  const addTask = useCallback(
    (projectId: string, input: NewTaskInput) => {
      const title = input.title.trim()
      const description = input.description?.trim()
      const tag = input.tag?.trim()

      if (!title) {
        return
      }

      const task: TaskItem = {
        id: createId('task'),
        title,
        description: description || undefined,
        tag: tag || undefined,
        createdAt: new Date().toISOString(),
      }

      dispatch({ type: 'ADD_TASK', projectId, task })
    },
    [dispatch],
  )

  const deleteTask = useCallback(
    (projectId: string, taskId: string) => {
      dispatch({ type: 'DELETE_TASK', projectId, taskId })
    },
    [dispatch],
  )

  const moveTask = useCallback(
    (fromProjectId: string, toProjectId: string, taskId: string) => {
      dispatch({ type: 'MOVE_TASK', fromProjectId, toProjectId, taskId })
    },
    [dispatch],
  )

  return {
    projects: state.projects,
    addTask,
    deleteTask,
    moveTask,
  }
}
