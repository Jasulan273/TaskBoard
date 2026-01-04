import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { Project, TaskItem } from "./types"
import { initialBoardState } from "./initialState"
import { createId } from "../../../shared/lib/id"
import { normalizeOptional, sanitizeText } from "../../../shared/lib/sanitize"

const STORAGE_KEY = "project-board-state-v2"

type NewTaskInput = {
  title: string
  description?: string
  tag?: string
}

type TaskPatch = {
  title?: string
  description?: string
  tag?: string
}

type ProjectStore = {
  projects: Project[]
  addTask: (projectId: string, input: NewTaskInput) => boolean
  updateTask: (projectId: string, taskId: string, patch: TaskPatch) => boolean
  deleteTask: (projectId: string, taskId: string) => void
  moveTask: (fromProjectId: string, taskId: string, toProjectId: string) => void
  replaceProjects: (projects: Project[]) => void
  resetBoard: () => void
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null

const toStringValue = (value: unknown) => (typeof value === "string" ? value : "")

const parseTask = (value: unknown): TaskItem | null => {
  if (!isRecord(value)) {
    return null
  }

  const id = toStringValue(value.id)
  const title = sanitizeText(toStringValue(value.title))
  if (!id || !title) {
    return null
  }

  const description = normalizeOptional(
    typeof value.description === "string" ? value.description : undefined,
  )
  const tag = normalizeOptional(
    typeof value.tag === "string" ? value.tag : undefined,
  )
  const createdAt = toStringValue(value.createdAt) || new Date().toISOString()

  return {
    id,
    title,
    description,
    tag,
    createdAt,
  }
}

const parseProject = (value: unknown): Project | null => {
  if (!isRecord(value)) {
    return null
  }

  const id = toStringValue(value.id)
  const name = sanitizeText(toStringValue(value.name))
  const accent = toStringValue(value.accent)

  if (!id || !name || !accent || !Array.isArray(value.tasks)) {
    return null
  }

  const description = normalizeOptional(
    typeof value.description === "string" ? value.description : undefined,
  )
  const tasks = value.tasks.map(parseTask).filter(Boolean) as TaskItem[]

  return {
    id,
    name,
    accent,
    description,
    tasks,
  }
}

const normalizeProjects = (value: unknown): Project[] | null => {
  if (!Array.isArray(value)) {
    return null
  }
  const projects = value.map(parseProject).filter(Boolean) as Project[]
  return projects.length > 0 ? projects : []
}

export const parseBoardPayload = (payload: unknown) => {
  if (isRecord(payload) && Array.isArray(payload.projects)) {
    return normalizeProjects(payload.projects)
  }
  return normalizeProjects(payload)
}

const sanitizeTaskPatch = (task: TaskItem, patch: TaskPatch) => {
  const title =
    patch.title !== undefined ? sanitizeText(patch.title) : task.title
  if (!title) {
    return null
  }

  const description =
    patch.description !== undefined
      ? normalizeOptional(patch.description)
      : task.description
  const tag =
    patch.tag !== undefined ? normalizeOptional(patch.tag) : task.tag

  return {
    ...task,
    title,
    description,
    tag,
  }
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: initialBoardState.projects,

      addTask: (projectId, input) => {
        const title = sanitizeText(input.title)
        if (!title) {
          return false
        }

        const description = normalizeOptional(input.description)
        const tag = normalizeOptional(input.tag)

        const newTask: TaskItem = {
          id: createId("task"),
          createdAt: new Date().toISOString(),
          title,
          description,
          tag,
        }

        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? { ...project, tasks: [newTask, ...project.tasks] }
              : project,
          ),
        }))

        return true
      },

      updateTask: (projectId, taskId, patch) => {
        const state = get()
        const project = state.projects.find((item) => item.id === projectId)
        const task = project?.tasks.find((item) => item.id === taskId)

        if (!project || !task) {
          return false
        }

        const nextTask = sanitizeTaskPatch(task, patch)
        if (!nextTask) {
          return false
        }

        set((state) => ({
          projects: state.projects.map((current) =>
            current.id === projectId
              ? {
                  ...current,
                  tasks: current.tasks.map((item) =>
                    item.id === taskId ? nextTask : item,
                  ),
                }
              : current,
          ),
        }))

        return true
      },

      deleteTask: (projectId, taskId) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  tasks: project.tasks.filter((task) => task.id !== taskId),
                }
              : project,
          ),
        }))
      },

      moveTask: (fromProjectId, taskId, toProjectId) => {
        if (fromProjectId === toProjectId) {
          return
        }

        const state = get()
        const fromProject = state.projects.find(
          (project) => project.id === fromProjectId,
        )

        if (!fromProject) {
          return
        }

        const task = fromProject.tasks.find((item) => item.id === taskId)

        if (!task) {
          return
        }

        set((state) => ({
          projects: state.projects.map((project) => {
            if (project.id === fromProjectId) {
              return {
                ...project,
                tasks: project.tasks.filter((item) => item.id !== taskId),
              }
            }

            if (project.id === toProjectId) {
              return {
                ...project,
                tasks: [task, ...project.tasks],
              }
            }

            return project
          }),
        }))
      },

      replaceProjects: (projects) => {
        set({ projects })
      },

      resetBoard: () => {
        set({ projects: initialBoardState.projects })
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ projects: state.projects }),
      merge: (persistedState, currentState) => {
        const parsed = parseBoardPayload(
          (persistedState as { projects?: unknown })?.projects,
        )
        return {
          ...currentState,
          projects: parsed ?? currentState.projects,
        }
      },
    },
  ),
)
