import electron from 'electron';
import findProcess from 'find-process';
import terminate from 'terminate';

import config from '../package.json';

const SIGNAL = 'SIGINT';
const debug = process.argv.indexOf('--debugger') > -1;
const apollo = process.argv.indexOf('--apollo') > -1;

async function kill() {
  await findProcess('name', electron.replace(/\\/g, '\\\\')).then(async processes1 => {
    let terminated = false;

    async function killApollo() {
      await findProcess('port', 9229).then(processes => processes.forEach(({ pid }) => {
        terminate(pid, SIGNAL);
        terminated = true;
      }));
    }

    if (apollo) {
      await killApollo();
    } else if (debug ? !processes1.length : !debug) {
      await findProcess('name', 'concurrently').then(processes2 => {
        const process = processes2.find(({ cmd }) => cmd.indexOf(config.scripts['build:dev']) > -1);
        if (process) {
          terminate(process.pid, SIGNAL);
          terminated = true;
        }
      });
      await findProcess('name', 'scripts/start.js').then(processes3 => processes3.forEach(({ pid }) => {
        terminate(pid, SIGNAL);
        terminated = true;
      }));
      if (!debug) {
        await killApollo();
      }
    }
    console.log(terminated ? 'Development processes terminated.' : 'No action performed.'); // eslint-disable-line no-console
  });
}

kill();
