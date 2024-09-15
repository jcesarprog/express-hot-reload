import { NextFunction, Request, Response } from "express";
import fs from "fs";

interface SSEHotReloadOptions {
  watchFolders?: string[];
  verbose?: boolean;
}

let clients: Response[] = [];

export function hotReloadMiddleware(
  options: SSEHotReloadOptions = {
    watchFolders: ["./src"],
    verbose: false,
  }
) {
  const { watchFolders, verbose } = options;

  // Watch files for changes and notify clients when files are changed
  watchFolders?.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      throw new Error("Folder not found: " + folder);
    } else {
      fs.watch(
        folder,
        { recursive: true },
        (_eventType: any, _filename: any) => {
          // console.log(`File changed: ${filename} in ${folder}`);
          notifyClients();
        }
      );
    }
  });

  // Middleware function for SSE and HTML injection
  return (req: Request, res: Response, next: NextFunction): void => {
    if (clients.length > 0 && verbose) {
      console.log("Client connected");
    }
    // Use a unique path to avoid clashes (e.g., '/__sse_hot_reload')
    if (req.path === "/__sse_hot_reload") {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      clients.push(res);

      req.on("close", () => {
        clients = clients.filter((client) => client !== res);
      });
    } else {
      const originalSend = res.send;

      // Overwrite the send method to inject the client-side script for auto-reload
      res.send = function (body: any) {
        if (typeof body === "string" && body.includes("<html>")) {
          const injectScript = `
            <script>
              const eventSource = new EventSource('/__sse_hot_reload');
              eventSource.onmessage = function(event) {
                if (event.data === 'refresh') {
                  window.location.reload();
                }
              };
              eventSource.onerror = function() {
                setTimeout(() => {
                  window.location.reload();
                }, 500);
              };
            </script>
          `;
          body = body.replace("</body>", injectScript + "</body>");
        }
        return originalSend.call(this, body);
      };

      next();
    }
  };
}

function notifyClients(): void {
  clients.forEach((client) => {
    client.write("data: refresh\n\n");
  });
}

export default hotReloadMiddleware;
