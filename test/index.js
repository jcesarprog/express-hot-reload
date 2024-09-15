const express = require("express");
const { sseHotReload } = require("../dist");

const app = express();

// Use the hot-reload middleware
app.use(sseHotReload({ watchFolders: ["./test"] }));

app.get("/", (req, res) => {
  res.send("<html><body><h1>Hello World</h1></body></html>");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
