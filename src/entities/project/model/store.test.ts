import { beforeEach, describe, expect, it } from "vitest"

import { initialBoardState } from "./initialState"
import { useProjectStore } from "./store"

const resetStore = () => {
  useProjectStore.setState({ projects: initialBoardState.projects })
  localStorage.clear()
}

describe("project store", () => {
  beforeEach(() => {
    resetStore()
  })

  it("adds task with sanitized input", () => {
    const addTask = useProjectStore.getState().addTask

    addTask("p-intake", {
      title: "<b>Task</b>",
      description: "<script>alert(1)</script>",
      tag: "<urgent>",
    })

    const task = useProjectStore.getState().projects[0].tasks[0]
    expect(task.title).not.toMatch(/[<>]/)
    expect(task.description ?? "").not.toMatch(/[<>]/)
    expect(task.tag ?? "").not.toMatch(/[<>]/)
  })

  it("does not move task within the same column", () => {
    const state = useProjectStore.getState()
    const projectId = state.projects[0].id
    const firstTaskId = state.projects[0].tasks[0].id
    const beforeCount = state.projects[0].tasks.length

    state.moveTask(projectId, firstTaskId, projectId)

    const afterCount = useProjectStore.getState().projects[0].tasks.length
    expect(afterCount).toBe(beforeCount)
  })

  it("rejects empty title updates", () => {
    const state = useProjectStore.getState()
    const projectId = state.projects[0].id
    const firstTaskId = state.projects[0].tasks[0].id

    const updated = state.updateTask(projectId, firstTaskId, { title: "   " })

    expect(updated).toBe(false)
  })
})
