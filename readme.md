# express-hot-reload

`@devmade/express-hot-reload` is a middleware for Express applications that provides hot-reloading using Server-Sent Events (SSE). This package allows automatic page refreshes in the browser when changes to server-side files are detected. It is especially useful during development to improve productivity by eliminating the need to manually refresh the browser after every code change.

![NPM Page](https://www.npmjs.com/package/@devmade/express-hot-reload)

### Features

- **File Watching**: Automatically watches specified folders for file changes.
- **Server-Sent Events (SSE)**: Uses SSE to notify the browser about file changes and trigger a page reload.
- **HTML Injection**: Automatically injects the SSE listener into any HTML responses.
- **Customizable**: Configure folders to watch and adjust the ping interval for your specific needs.
- **Compatibility**: Works with **CommonJS**, **ES6**, and **TypeScript** projects.

### Installation

```bash
npm install @devmade/express-hot-reload
```

### Usage

To use `@devmade/express-hot-reload`, simply import and add it as middleware in your Express app:

#### CommonJS:

```js
const express = require("express");
const { hotReloadMiddleware } = require("@devmade/express-hot-reload");
```

#### ES6:

```js
import express from "express";
import { hotReloadMiddleware } from "@devmade/express-hot-reload";

const app = express();

// Add the middleware to your Express app
// app.use(hotReloadMiddleware());
// OR passing options like..
app.use(hotReloadMiddleware({ watchFolders: ["./src", "./views"] }));
// it accpets multiple folders optionally or if none is passed it will defaults to `.src`

app.get("/", (req, res) => {
  res.send("<html><body><h1>Hello World</h1></body></html>");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Options

- **`watchFolders`**: Array of folder paths to watch for file changes. Defaults to `['./src']`.
- **`verbose`**: A boolean to define if there will be any output from this middleware. Defaults to `false`.

### Example

```js
app.use(
  hotReloadMiddleware({
    watchFolders: ["./src", "./public"], // Defaults to `./src`
    verbose: false, // Defaults to `false`
  })
);
```

When any file in the specified folders changes, the connected browser will automatically refresh, improving your development workflow.

---
