import type { BunFile } from "bun"

const serverDir = "/var/www/rxt/"
Bun.serve({
    async fetch(request) {
        const reqURL: URL = new URL(request.url)
        const reqFileName: string = reqURL.pathname.split("/").pop() || ""
        const reqFileSource: BunFile  = Bun.file(serverDir + reqFileName)
        if (reqFileName != "" && await reqFileSource.exists()) {
            return new Response(reqFileSource, {
                headers: {
                    "Content-Type": reqFileSource.type
                }
            })
        }
        if(reqFileName == "") {
            return new Response(Bun.file("./index.html"),{
                headers: {
                    "Content-Type": "text/html"
                }
            })
        }

        return new Response("Not Found", {
            status: 404,
            statusText: "Not Found",
            headers: {
                "Content-Type": "text/plain"
            }
        })
    },
    port: 443,
    hostname: "0.0.0.0",
    tls: {
        key: Bun.file("/etc/rxt/ssl/rxt_key.pem"),
        cert: Bun.file("/etc/rxt/ssl/rxt_cert.pem"),
        serverName: "rextongaming.com"
    },
    websocket: {
        open(ws) {

        },
        message(ws, message) {
            ws.send(message instanceof Buffer ? new Uint8Array(message) : message)
        },
    }
})