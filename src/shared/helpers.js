export function createPathSelector(path) {
  return path.split('/');
}

export function hasWildCard(pathSelector) {
  return pathSelector.some((path) => {
    const isMultiLevelPath = path === '#';
    const isSignleLevelPath = path === '+';

    return isSignleLevelPath || isMultiLevelPath;
  });
}
