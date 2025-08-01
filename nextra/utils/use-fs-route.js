import { ERROR_ROUTES } from "@/config/constants.js"
import { useRouter } from "next/router"
import { useMemo } from "react"

const template = "https://surveywithcode.com"

export const useFSRoute = () => {
  const { locale = "en", asPath, route } = useRouter()

  return useMemo(() => {
    // because for the 404 route `asPath` will be redirected URL and `normalizePages` will never return correct pageItem
    const clientRoute = ERROR_ROUTES.has(route) ? route : asPath

    const { pathname } = new URL(clientRoute, template)

    const cleanedPath = locale
      ? pathname.replace(new RegExp(`\\.${locale}(\\/|$)`), "$1")
      : pathname

    return (
      cleanedPath
        .replace(/\.html$/, "")
        .replace(/\/index(\/|$)/, "$1")
        .replace(/\/$/, "") || "/"
    )
  }, [asPath, locale, route])
}
