export type TaskItem = {
  id: string
  title: string
  description?: string
  tag?: string
  createdAt: string
}

export type Project = {
  id: string
  name: string
  description?: string
  accent: string
  tasks: TaskItem[]
}

export type BoardState = {
  projects: Project[]
}
