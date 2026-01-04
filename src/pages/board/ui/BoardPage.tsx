import { useMemo, useState } from "react"

import type { Project } from "../../../entities/project/model/types"
import { useProjectStore } from "../../../entities/project/model/store"
import { unique } from "../../../shared/lib/array"
import { BoardHeader } from "../../../widgets/board/ui/BoardHeader"
import { BoardColumns } from "../../../widgets/board/ui/BoardColumns"
import { TaskFilters } from "../../../features/task-filter/ui/TaskFilters"
import { BoardTools } from "../../../features/board-tools/ui/BoardTools"

const filterProjects = (
  projects: Project[],
  query: string,
  tag: string,
) => {
  const trimmedQuery = query.trim().toLowerCase()
  const normalizedTag = tag.toLowerCase()

  if (!trimmedQuery && normalizedTag === "all") {
    return projects
  }

  return projects.map((project) => ({
    ...project,
    tasks: project.tasks.filter((task) => {
      const matchesQuery =
        !trimmedQuery ||
        task.title.toLowerCase().includes(trimmedQuery) ||
        task.description?.toLowerCase().includes(trimmedQuery) ||
        task.tag?.toLowerCase().includes(trimmedQuery)

      const matchesTag =
        normalizedTag === "all" ||
        task.tag?.toLowerCase() === normalizedTag

      return matchesQuery && matchesTag
    }),
  }))
}

const collectTags = (projects: Project[]) => {
  const tags = projects.flatMap((project) =>
    project.tasks
      .map((task) => task.tag)
      .filter((tag): tag is string => Boolean(tag)),
  )
  return unique(tags).sort()
}

const BoardPage = () => {
  const projects = useProjectStore((state) => state.projects)
  const [query, setQuery] = useState("")
  const [tag, setTag] = useState("all")

  const totalTasks = useMemo(
    () => projects.reduce((sum, project) => sum + project.tasks.length, 0),
    [projects],
  )

  const tags = useMemo(() => collectTags(projects), [projects])
  const filteredProjects = useMemo(
    () => filterProjects(projects, query, tag),
    [projects, query, tag],
  )

  return (
    <div className="min-h-screen px-6 py-10 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <BoardHeader
          totalProjects={projects.length}
          totalTasks={totalTasks}
        />

        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <TaskFilters
              query={query}
              tag={tag}
              tags={tags}
              onQueryChange={setQuery}
              onTagChange={setTag}
            />
            <BoardTools />
          </div>
        </section>

        <BoardColumns projects={filteredProjects} />
      </div>
    </div>
  )
}

export default BoardPage
