import { renderToString } from "react-dom/server"
import { HomePage, TournamentsPage } from "@rexton/web"
import type { IPageProps } from "@rexton/shared"

/**
 * Server-side rendering utility
 * Renders TSX pages to HTML strings for SSR
 */
export function renderPage(props: IPageProps): string {
    const { path } = props

    let pageComponent: React.JSX.Element

    // Route matching for pages
    switch (path) {
        case "/":
            pageComponent = <HomePage />
            break
        case "/tournaments":
            pageComponent = <TournamentsPage />
            break
        default:
            pageComponent = (
                <div>
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for does not exist.</p>
                </div>
            )
    }

    // Render component to HTML string
    const html = renderToString(pageComponent)
    return `<!DOCTYPE html>${html}`
}
