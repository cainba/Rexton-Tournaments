Bun.serve({
    fetch(request) {
        const reqURL = new URL(request.url)
        if(reqURL.pathname === '/hello') {
            return new Response('Hello World!')
        }
    },
    port: Bun.env.PORT,
    hostname: Bun.env.HOSTNAME,
    tls: {
        key: Bun.env.TLS_KEY ? Bun.file(Bun.env.TLS_KEY) : undefined,
        cert: Bun.env.TLS_CERT ? Bun.file(Bun.env.TLS_CERT) : undefined
    },
    websocket: {
       open(ws) {

       },
         message(ws, message) {
              ws.send(message instanceof Buffer ? new Uint8Array(message) : message)
         },
    }
})