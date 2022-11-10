'use strict';

module.exports = function (/* environment, appConfig */) {
  return {
    arcgisCoreVersion: require('@arcgis/core/package.json').version,
  };
};
