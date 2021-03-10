#!/usr/bin/env node
import { program } from 'commander';
import { serveCommand } from './commands/serve';

// Merge the commands
program.addCommand(serveCommand);
// Figure out what commands the user is using
program.parse(process.argv);
