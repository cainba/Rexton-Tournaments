export const rxtServer = {
    serve: function() {
        Bun.serve({
            fetch(req){
                const pathName = URL(req.url).pathname;
                if(pathName == "/home") {
                    return new Response("Site is under construction. Please check back later. 😎");
                } else {
                    return Response.error(404,"Not Found")
                }
            },
            port: process.env.RXT_SERVE_PORT,
            hostname: process.env.RXT_SERVE_HOSTNAME,
            tls:{
                key: Bun.file(process.env.RXT_SERVE_TLS_KEY),
                cert: Bun.file(process.env.RXT_SERVE_TLS_CERT)
            }
        })
    }
}