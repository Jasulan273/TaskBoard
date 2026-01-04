import { useEffect, useSyncExternalStore } from "react"

const getHashPath = () => {
  if (typeof window === "undefined") {
    return "/"
  }
  const hash = window.location.hash.replace(/^#/, "")
  return hash.length > 0 ? hash : "/"
}

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") {
    return () => undefined
  }
  window.addEventListener("hashchange", callback)
  return () => window.removeEventListener("hashchange", callback)
}

export const useHashLocation = () =>
  useSyncExternalStore(subscribe, getHashPath, () => "/")

export const ensureHash = (path: string) => {
  if (typeof window === "undefined") {
    return
  }
  if (!window.location.hash) {
    window.location.hash = path
  }
}

export const createHashHref = (path: string) => `#${path}`

export const useHashNavigation = () => {
  const location = useHashLocation()

  useEffect(() => {
    ensureHash("/")
  }, [])

  return location
}
