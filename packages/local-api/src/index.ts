import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { createCellsRouter } from './routes/cell';

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean,
) => {
  const app = express();

  // Match the request inside cells router ('get' or 'post' cells)
  app.use(createCellsRouter(filename, dir));

  // Load the damn react assets
  if (useProxy) {
    // If we are developing our app on on our local machine
    // Create proxy server for serving up the build folder from our react app
    // If the request is not GET or POST cells, we redirect the request to localhost:3000 which is our react app
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        // Dont log incoming requests
        logLevel: 'silent',
      }),
    );
  } else {
    // When the user installed the cli to their local machine
    // Look up the location of the local-client module and get the absolute path to that poor index.html
    const packagePath = require.resolve(
      '@devs-notes/local-client/build/index.html',
    );
    // Serve up the index.html
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
