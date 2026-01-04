import { useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { useShallow } from "zustand/shallow"

import {
  parseBoardPayload,
  useProjectStore,
} from "../../../entities/project/model/store"

export const BoardTools = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const { projects, replaceProjects, resetBoard } = useProjectStore(
    useShallow((state) => ({
      projects: state.projects,
      replaceProjects: state.replaceProjects,
      resetBoard: state.resetBoard,
    })),
  )

  const handleExport = () => {
    const payload = JSON.stringify({ projects }, null, 2)
    const blob = new Blob([payload], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "board-state.json"
    link.click()
    URL.revokeObjectURL(url)
    setNotice("Exported board-state.json")
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const text = await file.text()
      const parsed = parseBoardPayload(JSON.parse(text))
      if (!parsed) {
        throw new Error("Invalid payload")
      }
      replaceProjects(parsed)
      setNotice("Board imported")
    } catch {
      setNotice("Import failed. Check the JSON format.")
    } finally {
      event.target.value = ""
    }
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset board to the default sample data?",
    )
    if (!confirmed) {
      return
    }
    resetBoard()
    setNotice("Board reset")
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExport}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        >
          Export JSON
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        >
          Import JSON
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
        >
          Reset Board
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleImport}
      />
      {notice ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          {notice}
        </p>
      ) : null}
    </div>
  )
}
