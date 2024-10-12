
const resourceRouter = new Bun.FileSystemRouter({
    dir: `${import.meta.dir}/public`,
    style: "nextjs",
    origin: "https://rextongaming.com"
})
Bun.serve({
    async fetch(request) {
        const reqURL: URL = new URL(request.url)
        const reqFileName: string = reqURL.pathname.split("/").pop() || ""
        const reqFileSource = Bun.file("./assets" + reqURL.pathname)
        if (reqFileName != "" && await reqFileSource.exists()) {
           const file = resourceRouter.match(reqURL.pathname)?.src
            const reource = Bun.file(`${file}`)
            return new Response(reource, {
                headers: {
                    "Content-Type": reource.type
                }
            })
        }
        if (reqFileName == "") {
            if(resourceRouter.match(reqURL.pathname)?.src){
                return new Response(resourceRouter.match(reqURL.pathname)?.src, {
                    headers: {
                        "Content-Type": resourceRouter.match(reqURL.pathname)?.type
                    }
                })
            }
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