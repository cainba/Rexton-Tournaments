Bun.serve({
    hostname: "0.0.0.0",
    port: 443,
    tls: {
        key: Bun.file(String(Bun.env.SSL_KEY_PATH)),
        cert: Bun.file(String(Bun.env.SSL_CERT_PATH))
    },
    fetch(request, server) {
        const reqURL = new URL(request.url)
        const reqPATH = reqURL.pathname
        const reqHEADERS = request.headers.toJSON()
        if (reqPATH === "/") {
            return new Response(`<!DOCTYPE html>
                <html lang='en'>
                    <body>
                        <h1> welcome to rexton gaming 😎 </h1>
                    </body>
                </html>
            `)
        }
    },
    websocket: {
        open(ws) {

        },
        close(ws, code, reason) {

        },
        message(ws, message) {

        },
    }
})