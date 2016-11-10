const runSetup = require('./src/setup');
const setupOptions = require('./src/options');
const setupAPI = require('./src/api');
const Constants = require('./src/constants');

const Draw = function(options) {
  options = setupOptions(options);

  const ctx = {
    options: options
  };

  const api = setupAPI(ctx);
  ctx.api = api;

  const setup = runSetup(ctx);

  api.addTo = setup.addTo;
  api.remove = setup.remove;
  api.types = Constants.types;
  api.options = options;

  return api;
};

module.exports = Draw;
