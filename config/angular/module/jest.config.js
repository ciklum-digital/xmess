const { join } = require('path');

function resolveJestModuleNameMapperKey(key) {
  return key.replace(/\*/, '(.*)');
}

function resolveJestModuleNameMapperValue(path) {
  return join(__dirname, path.replace(/\*/, '$1'));
}

function getTypescriptPaths() {
  const config = require('./tsconfig.spec.json');
  const { paths } = config.compilerOptions;

  if (!paths) {
    return;
  }

  const jestModuleNameMapper = {};

  Object.keys(paths).forEach((key) => {
    const [path] = paths[key];
    jestModuleNameMapper[resolveJestModuleNameMapperKey(key)] = resolveJestModuleNameMapperValue(path);
  });

  return jestModuleNameMapper;
}

module.exports = {
  moduleNameMapper: getTypescriptPaths(),
  globals: {
    'ts-jest': {
      tsConfigFile: '<rootDir>/misc/angular/module/tsconfig.spec.json',
    }
  }
};
