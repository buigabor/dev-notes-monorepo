import { serve } from '@dev-notes-bui/local-api';
import { Command } from 'commander';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename] []')
  .description('Open a file for editing')
  .option('-p,--port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction,
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit file`,
      );
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        console.error(
          options.port + ' is in use. Try running on a different port.',
        );
      } else {
        console.log(error.message);
      }
      process.exit(1);
    }
  });
