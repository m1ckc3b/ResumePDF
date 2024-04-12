
const server = Bun.serve({
  port: process.env.PORT,
  async fetch(req) {
    const path = new URL(req.url).pathname

    if (req.method === "POST" && path === "/api") {
      const data = await req.json()

      return Response.json({
        
      })
    }

    if (req.method === "GET" && path === "/api") {
      return new Response("Hello from resumePDF")
    }

    return new Response("Page not found", { status: 404 })
  }
})

console.log(`Server is listenning on ${server.url}`)