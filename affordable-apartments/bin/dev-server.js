#!/usr/bin/env node

// A heavily modified fork of webpack-watch-server that supports multiple
// webpack configs and fancy progress bars.

const chalk = require('chalk');
const minimist = require('minimist');
const path = require('path');
const webpack = require('webpack');
const Liftoff = require('liftoff');
const ProgressBar = require('progress');
const { spawn } = require('child_process');

function logInfo(msg = '') {
  process.stdout.write(`${msg}\n`);
}

function logSuccess(msg) {
  process.stdout.write(chalk.green(`${msg}\n`));
}

function logError(msg) {
  process.stdout.write(chalk.red(`${msg}\n`));
}

function clearConsole() {
  process.stdout.write('\u001Bc');
}

function invoke(env) {
  clearConsole();

  if (!env.configPath) {
    logError('Webpack config file not found.');
    process.exitCode = 1;
    return;
  }

  logInfo('Loading Webpack config...');
  let webpackConfigs = require(env.configPath);

  if (typeof webpackConfigs === 'object'
      && typeof webpackConfigs.default === 'object') {
    // Normalize default export.
    webpackConfigs = webpackConfigs.default;
  }

  if (!Array.isArray(webpackConfigs)) {
    webpackConfigs.name = 'server';
    webpackConfigs = [webpackConfigs];
  }

  for (let webpackConfig of webpackConfigs) {
    webpackConfig.mode = 'development';
  }

  let serverConfig = webpackConfigs.filter((c) => c.name === 'server')[0];
  let outputPath = path.join(serverConfig.output.path,
                             serverConfig.output.filename);
  let serverProcess = null;

  function startServer() {
    serverProcess = spawn('node', [outputPath]);
    serverProcess.stdout.on('data', data => process.stdout.write(data));
    serverProcess.stderr.on('data', logError);
  }

  function stopServer() {
    if (serverProcess) {
      serverProcess.kill();
      serverProcess = null;
    }
  }

  const compiler = webpack(webpackConfigs);
  const PROGRESS_BAR_FORMAT = 'Compiling [:bar] :percent, :elapseds elapsed';
  let progressPercentage = 0;
  let progressBar = null;

  compiler.hooks.watchRun.tap('DevServer', () => {
    clearConsole();
    progressBar = new ProgressBar(PROGRESS_BAR_FORMAT, {
      total: 100,
      width: 50,
      incomplete: ' ',
      stream: process.stdout,
    });
    progressPercentage = 0;
  });

  compiler.apply(new webpack.ProgressPlugin((p) => {
    let newPercentage = Math.floor(p * 100);
    progressBar.tick(newPercentage - progressPercentage);
    progressPercentage = newPercentage;
  }));

  const watcher = compiler.watch({}, (errors, multiStats) => {
    for (let stats of multiStats.stats) {
      let name = stats.compilation.name;
      if (name === 'server') {
        clearConsole();
        stopServer();
        startServer();
      }
      let time = stats.endTime - stats.startTime;
      if (stats.hasErrors()) {
        logError(`Compiling ${name} failed in ${time}ms`);
      } else {
        logSuccess(`Compiled ${name} successfully in ${time}ms`);
      }
    }

    logInfo(); // Empty line.

    if (errors || multiStats.hasErrors()) {
      logInfo(multiStats.toString('errors-only'));
    }
  });

  function exit() {
    logError('exit');
    watcher.close();
    stopServer();
  }

  [
    'SIGINT',
    'SIGTERM',
    'SIGHUP',
    'SIGQUIT',
    'exit',
    'uncaughtException',
  ].forEach(event => process.on(event, exit));
}

const args = minimist(process.argv.slice(2));
const DevServer = new Liftoff({
  name: 'dev-server',
  configName: 'webpack',
  extensions: {
    '.config.babel.js': 'babel-register',
    '.config.js': null,
  },
});
DevServer.launch({ configPath: args.config }, invoke);
