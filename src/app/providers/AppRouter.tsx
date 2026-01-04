import { lazy, Suspense } from "react"

import { PageLoader } from "../../shared/ui/PageLoader"
import { useHashNavigation } from "../../shared/lib/router"
import { ErrorBoundary } from "./ErrorBoundary"

const BoardPage = lazy(() => import("../../pages/board/ui/BoardPage"))
const AnalyticsPage = lazy(
  () => import("../../pages/analytics/ui/AnalyticsPage"),
)

export const AppRouter = () => {
  const location = useHashNavigation()
  const CurrentPage = location === "/analytics" ? AnalyticsPage : BoardPage

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <CurrentPage />
      </Suspense>
    </ErrorBoundary>
  )
}
