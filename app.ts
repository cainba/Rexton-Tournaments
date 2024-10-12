Bun.serve({
    fetch(request) {
        const reqURL = new URL(request.url)
        if(reqURL.pathname === '/hello') {
            return new Response(Bun.file("index.html"), {
                headers: {
                    "Content-Type": "text/html"
                }
            })
        }
    },
    port:443,
    hostname:"0.0.0.0",
    tls: {
        key:Bun.file("/etc/rxt/ssl/rxt_key.pem"),
        cert:Bun.file("/etc/rxt/ssl/rxt_cert.pem"),
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