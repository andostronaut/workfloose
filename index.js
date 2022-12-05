#!/usr/bin/env node

/**
 * workfloose
 * Scaffold github workflow for CI/CD
 *
 * @author iamando <iamando@tuta.io>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
  init({ clear });
  input.includes(`help`) && cli.showHelp(0);

  debug && log(flags);
})();
