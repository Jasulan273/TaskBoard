import type { Project } from "../../../entities/project/model/types"
import { BoardColumn } from "./BoardColumn"

type BoardColumnsProps = {
  projects: Project[]
}

export const BoardColumns = ({ projects }: BoardColumnsProps) => {
  if (projects.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 p-12 text-center text-sm text-slate-500">
        No columns available. Import a board or reset to defaults.
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <BoardColumn
          key={project.id}
          project={project}
          prevProjectId={projects[index - 1]?.id}
          nextProjectId={projects[index + 1]?.id}
        />
      ))}
    </div>
  )
}
