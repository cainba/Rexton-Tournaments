import { useState, useEffect } from "react"
import type { ILayoutProps, IAppState } from "@rexton/shared"
import "../styles/base.css"

/**
 * BaseLayout - The main layout template for all pages
 * - Handles application state
 * - Provides standardized CSS styling
 * - Supports caching of common elements
 */
export function BaseLayout({ title, children, state }: ILayoutProps): React.JSX.Element {
    const [appState, setAppState] = useState<IAppState>({
        user: null,
        tournament: null,
        loading: false,
        ...state
    })

    useEffect(() => {
        // Restore cached state from sessionStorage if available
        const cachedState = sessionStorage.getItem("appState")
        if (cachedState !== null && cachedState.length > 0) {
            try {
                const parsed = JSON.parse(cachedState) as IAppState
                setAppState((prev) => ({ ...prev, ...parsed }))
            } catch (error) {
                console.error("Failed to parse cached state:", error)
            }
        }
    }, [])

    useEffect(() => {
        // Cache state to sessionStorage for persistence
        sessionStorage.setItem("appState", JSON.stringify(appState))
    }, [appState])

    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta 
                    name="viewport" 
                    content="width=device-width, initial-scale=1.0" 
                />
                <meta
                    name="description"
                    content="Rexton Tournaments - League of Legends tournament platform"
                />
                <title>{`${title} - Rexton Tournaments`}</title>
            </head>
            <body>
                <header>
                    <nav className="container">
                        <a href="/">
                            <h1>Rexton Tournaments</h1>
                        </a>
                        <a href="/tournaments">Tournaments</a>
                        <a href="/about">About</a>
                        {appState.user ? (
                            <span style={{ marginLeft: "auto" }}>
                                Welcome, {appState.user.username}
                            </span>
                        ) : (
                            <a href="/login" style={{ marginLeft: "auto" }}>
                                Login
                            </a>
                        )}
                    </nav>
                </header>
                <main className="container">
                    {appState.loading ? (
                        <div className="loading">Loading...</div>
                    ) : (
                        children
                    )}
                </main>
                <footer className="container" style={{ marginTop: "2rem" }}>
                    <p>&copy; 2025 Rexton Tournaments. All rights reserved.</p>
                </footer>
            </body>
        </html>
    )
}
