import { IPathSelector } from '../interfaces/path.interface';

export namespace PathUtil {
  export function createSelector(path: string): IPathSelector {
    return path.split('/');
  }

  export function hasWildCard(pathSelector: IPathSelector): boolean {
    return pathSelector.some((path) => {
      const isMultiLevelPath = path === '#';
      const isSingleLevelPath = path === '+';

      return isSingleLevelPath || isMultiLevelPath;
    });
  }

  export function getChildPathSelector(pathSelector: IPathSelector) {
    return pathSelector.slice(1);
  }
}
