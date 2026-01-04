type TaskFiltersProps = {
  query: string
  tag: string
  tags: string[]
  onQueryChange: (value: string) => void
  onTagChange: (value: string) => void
}

export const TaskFilters = ({
  query,
  tag,
  tags,
  onQueryChange,
  onTagChange,
}: TaskFiltersProps) => {
  return (
    <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-xl shadow-slate-200/40 backdrop-blur md:flex-row md:items-center">
      <div className="flex flex-1 flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Filter tasks
        </label>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by title, description, or tag"
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-amber-200"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          Tag
        </label>
        <select
          value={tag}
          onChange={(event) => onTagChange(event.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-amber-200"
        >
          <option value="all">All tags</option>
          {tags.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
