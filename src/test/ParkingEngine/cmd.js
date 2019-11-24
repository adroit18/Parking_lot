var path = require('path');
const { existsSync } = require('fs');
const spawn = require('cross-spawn');
const concat = require('concat-stream');
const PATH = process.env.PATH;

function createProcess(processPath, args = [], env = null) {
    if (!processPath || !existsSync(processPath)) {
        throw new Error('Invalid process path');
    }
    args = [processPath].concat(args);
    return spawn('node', args, {
        env: Object.assign(
            {
                NODE_ENV: 'test',
                preventAutoStart: false,
                PATH
            },
            env
        ),
        stdio: [null, null, null, 'ipc']
    });
}
function execute(processPath,args = [],inputs = [],opts = {}) {
    if (!Array.isArray(inputs)) {
      opts = inputs;
      inputs = [];
    }
  
    const { env = null, timeout = 100 } = opts;
    const childProcess = createProcess(processPath, args, env);
    childProcess.stdin.setEncoding('utf-8');
    
    let currentInputTimeout;
    const loop = inputs => {
      if (!inputs.length) {
        childProcess.stdin.end();
        return;
      }
  
      currentInputTimeout = setTimeout(() => {
        childProcess.stdin.write(inputs[0]);
        loop(inputs.slice(1));
      }, timeout);
    };
    const promise = new Promise((resolve, reject) => {
      childProcess.stderr.once('data', err => {
        childProcess.stdin.end();
  
        if (currentInputTimeout) {
          clearTimeout(currentInputTimeout);
          inputs = [];
        }
  
        reject(err.toString());
      });
      childProcess.on('error', reject);
      loop(inputs);
      childProcess.stdout.pipe(
        concat(result => {
          resolve(result.toString());
        })
      );
    });
    return promise;
  }
  module.exports = { execute };