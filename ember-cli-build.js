'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const configs = require('./config/environment');
// eslint-disable-next-line node/no-extraneous-require
const { Funnel } = require('broccoli-funnel');

module.exports = function (defaults) {
  const environment = EmberAddon.env();
  const config = configs(environment);
  const arcgisCoreDistDir = `arcgis-core-${config.arcgisCoreVersion}`;
  const arcgisCoreTree = new Funnel('node_modules/@arcgis/core/assets', {
    srcDir: '/',
    include: ['**/*'],
    destDir: `/${arcgisCoreDistDir}`,
  });

  let app = new EmberAddon(defaults, {
    // Add options here
    inlineContent: {
      'arcgis-core-styles': {
        content: `<link rel="stylesheet" href="/${arcgisCoreDistDir}/esri/themes/light/main.css">`,
      },
    },
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    extraPublicTrees: [arcgisCoreTree],
    skipBabel: [
      {
        package: 'qunit',
      },
      {
        package: '@arcgis/core',
      },
    ],
  });
};
