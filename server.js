
const http = require("http");

const PORT = process.env.PORT || 3000;

const servers = [];

const app = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.url === "/api/servers" && req.method === "GET") {
    res.end(JSON.stringify(servers));
    return;
  }

  if (req.url === "/api/servers" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      const data = JSON.parse(body || "{}");

      const server = {
        id: Date.now(),
        name: data.name || "My Server",
        version: data.version || "26.33",
        software: data.software || "PocketMine-MP",
        status: "created"
      };

      servers.push(server);

      res.end(JSON.stringify(server));
    });

    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not found" }));
});

app.listen(PORT, () => {
  console.log("CreateServer Host API started on " + PORT);
});
  
