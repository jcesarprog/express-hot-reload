# express-hot-reload-sse

`express-hot-reload-sse` is a middleware for Express applications that provides hot-reloading using Server-Sent Events (SSE). This package allows automatic page refreshes in the browser when changes to server-side files are detected. It is especially useful during development to improve productivity by eliminating the need to manually refresh the browser after every code change.

### Features

- **File Watching**: Automatically watches specified folders for file changes.
- **Server-Sent Events (SSE)**: Uses SSE to notify the browser about file changes and trigger a page reload.
- **HTML Injection**: Automatically injects the SSE listener into any HTML responses.
- **Customizable**: Configure folders to watch and adjust the ping interval for your specific needs.
- **Compatibility**: Works with CommonJS, ES6, and TypeScript projects.

### Installation

```bash
npm install express-hot-reload-sse
```

### Usage

To use `express-hot-reload-sse`, simply import and add it as middleware in your Express app:

```js
const express = require("express");
const { sseHotReload } = require("express-hot-reload-sse");

const app = express();

// Add the middleware to your Express app
app.use(sseHotReload({ watchFolders: ["./src", "./views"] }));

app.get("/", (req, res) => {
  res.send("<html><body><h1>Hello World</h1></body></html>");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Options

- **`watchFolders`**: Array of folder paths to watch for file changes. Defaults to `['./src']`.
- **`verbose`**: A boolean to define if there will be any output from this middlware. Defaults to `false`.

### Example

```js
app.use(
  sseHotReload({
    watchFolders: ["./src", "./public"],
    verbose: false,
  })
);
```

When any file in the specified folders changes, the connected browser will automatically refresh, improving your development workflow.

---

This summary outlines the key features, setup, and usage instructions for the middleware in a clear and concise manner.
