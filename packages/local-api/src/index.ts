import express from 'express';
export const serve = (port: number, filename: string, dir: string) => {
  const app = express();
  // Create proxy server for serving index.html and index.js
  app.use(express.static('../../local-client/build'));
  // app.use(
  //   createProxyMiddleware({
  //     target: 'http://localhost:3000',
  //     ws: true,
  //     logLevel: 'silent',
  //   }),
  // );
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};
