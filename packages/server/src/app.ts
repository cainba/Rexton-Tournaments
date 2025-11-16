import { renderPage } from "./render"

const PORT = process.env["PORT"] ?? "3000"

/**
 * Rexton Tournaments Server
 * Handles SSR for TSX pages and serves static assets
 */
const server = Bun.serve({
    port: PORT,
    fetch(req: Request): Response {
        const url = new URL(req.url)
        const path = url.pathname

        console.log(`${new Date().toISOString()} - ${req.method} ${path}`)

        // Serve static files from public directory
        if (path.startsWith("/static/")) {
            const filePath = `./packages/web/src/public${path.replace("/static", "")}`
            const file = Bun.file(filePath)
            return new Response(file)
        }

        // Server-side render pages
        try {
            const html = renderPage({ path, title: "Rexton Tournaments" })
            return new Response(html, {
                headers: {
                    "Content-Type": "text/html; charset=utf-8",
                    "Cache-Control": "public, max-age=3600"
                }
            })
        } catch (error) {
            console.error("Error rendering page:", error)
            return new Response("Internal Server Error", { status: 500 })
        }
    }
})

console.log(`Server running at http://localhost:${String(server.port)}`)
