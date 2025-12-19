import { createContext, useContext, useEffect, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import type { BoardState, TaskItem } from '../types'

type Action =
  | { type: 'ADD_TASK'; projectId: string; task: TaskItem }
  | { type: 'DELETE_TASK'; projectId: string; taskId: string }
  | {
      type: 'MOVE_TASK'
      fromProjectId: string
      toProjectId: string
      taskId: string
    }

type ProjectContextValue = {
  state: BoardState
  dispatch: Dispatch<Action>
}

const ProjectContext = createContext<ProjectContextValue | null>(null)

const STORAGE_KEY = 'project-board-state-v1'

const initialState: BoardState = {
  projects: [
    {
      id: 'p-intake',
      name: 'Intake',
      description: 'Scope and prioritize incoming work.',
      accent: '#f97316',
      tasks: [
        {
          id: 't-brief',
          title: 'Collect requirements',
          description: 'Confirm stakeholders and delivery date.',
          tag: 'brief',
          createdAt: '2025-01-05T09:00:00.000Z',
        },
        {
          id: 't-metrics',
          title: 'Define success metrics',
          description: 'Agree on quality, speed, and impact.',
          tag: 'planning',
          createdAt: '2025-01-06T10:30:00.000Z',
        },
      ],
    },
    {
      id: 'p-build',
      name: 'Build',
      description: 'Design and implementation in progress.',
      accent: '#0ea5e9',
      tasks: [
        {
          id: 't-layout',
          title: 'Create layout system',
          description: 'Grid, cards, and spacing rules.',
          tag: 'ui',
          createdAt: '2025-01-07T08:15:00.000Z',
        },
        {
          id: 't-state',
          title: 'Connect reducer logic',
          description: 'Wire Context, reducer, and hooks.',
          tag: 'state',
          createdAt: '2025-01-07T11:45:00.000Z',
        },
        {
          id: 't-review',
          title: 'UX review session',
          description: 'Walk through flows with the team.',
          tag: 'review',
          createdAt: '2025-01-08T14:00:00.000Z',
        },
      ],
    },
    {
      id: 'p-launch',
      name: 'Launch',
      description: 'Polish, test, and release.',
      accent: '#22c55e',
      tasks: [
        {
          id: 't-qa',
          title: 'QA checklist',
          description: 'Confirm flows and regression tests.',
          tag: 'qa',
          createdAt: '2025-01-09T09:45:00.000Z',
        },
      ],
    },
  ],
}

const boardReducer = (state: BoardState, action: Action): BoardState => {
  switch (action.type) {
    case 'ADD_TASK': {
      return {
        projects: state.projects.map((project) =>
          project.id === action.projectId
            ? { ...project, tasks: [action.task, ...project.tasks] }
            : project,
        ),
      }
    }
    case 'DELETE_TASK': {
      return {
        projects: state.projects.map((project) =>
          project.id === action.projectId
            ? {
                ...project,
                tasks: project.tasks.filter(
                  (task) => task.id !== action.taskId,
                ),
              }
            : project,
        ),
      }
    }
    case 'MOVE_TASK': {
      if (action.fromProjectId === action.toProjectId) {
        return state
      }

      const sourceProject = state.projects.find(
        (project) => project.id === action.fromProjectId,
      )
      const movedTask = sourceProject?.tasks.find(
        (task) => task.id === action.taskId,
      )

      if (!sourceProject || !movedTask) {
        return state
      }

      return {
        projects: state.projects.map((project) => {
          if (project.id === action.fromProjectId) {
            return {
              ...project,
              tasks: project.tasks.filter(
                (task) => task.id !== action.taskId,
              ),
            }
          }

          if (project.id === action.toProjectId) {
            return { ...project, tasks: [movedTask, ...project.tasks] }
          }

          return project
        }),
      }
    }
    default:
      return state
  }
}

const loadState = (): BoardState => {
  if (typeof window === 'undefined') {
    return initialState
  }

  const storedState = window.localStorage.getItem(STORAGE_KEY)
  if (!storedState) {
    return initialState
  }

  try {
    const parsed = JSON.parse(storedState) as BoardState
    if (!parsed || !Array.isArray(parsed.projects)) {
      return initialState
    }
    return parsed
  } catch {
    return initialState
  }
}

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadState)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return (
    <ProjectContext.Provider value={{ state, dispatch }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectContext = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within ProjectProvider')
  }
  return context
}
