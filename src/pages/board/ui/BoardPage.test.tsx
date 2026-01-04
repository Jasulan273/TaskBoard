import { beforeEach, describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import BoardPage from "./BoardPage"
import { initialBoardState } from "../../../entities/project/model/initialState"
import { useProjectStore } from "../../../entities/project/model/store"

const resetStore = () => {
  useProjectStore.setState({ projects: initialBoardState.projects })
  localStorage.clear()
}

describe("BoardPage", () => {
  beforeEach(() => {
    resetStore()
  })

  it("filters tasks by query", async () => {
    render(<BoardPage />)
    const user = userEvent.setup()

    expect(screen.getByText("Collect requirements")).toBeInTheDocument()

    const search = screen.getByPlaceholderText(
      "Search by title, description, or tag",
    )
    await user.clear(search)
    await user.type(search, "nonexistent")

    expect(screen.queryByText("Collect requirements")).not.toBeInTheDocument()
  })

  it("edits task title inline", async () => {
    render(<BoardPage />)
    const user = userEvent.setup()

    const editButtons = screen.getAllByRole("button", { name: /edit/i })
    await user.click(editButtons[0])

    const editInput = screen.getByDisplayValue("Collect requirements")
    await user.clear(editInput)
    await user.type(editInput, "Collect refined requirements")

    const saveButton = screen.getByRole("button", { name: /save/i })
    await user.click(saveButton)

    expect(
      screen.getByText("Collect refined requirements"),
    ).toBeInTheDocument()
  })
})
