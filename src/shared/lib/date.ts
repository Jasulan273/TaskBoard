export const formatDate = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    return "Unknown date"
  }
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(date)
}
