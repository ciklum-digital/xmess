import { PathUtil } from './path.util';

describe('[PathUtil]', () => {
  describe('createSelector(path: string): IPathSelector', () => {
    it('should create "pathSelector" from "channelPath"', () => {
      const channelPath = 'path1/path2/path3';
      const expectedPathSelector = ['path1', 'path2', 'path3'];

      const actualPathSelector = PathUtil.createSelector(channelPath);
      expect(actualPathSelector).toEqual(expectedPathSelector);
    });
  });

  describe('hasWildCard(pathSelector: IPathSelector): boolean', () => {
    it('should return "false" when "pathSelector" doesn\'t contain wildcard', () => {
      const pathSelectorWithoutWildCards = ['path1', 'path1'];

      const actualResult = PathUtil.hasWildCard(pathSelectorWithoutWildCards);
      expect(actualResult).toBeFalsy();
    });

    it('should return "true" when "pathSelector" contains single level wildcard "+"', () => {
      const pathSelectorWithSingleLevelWildCard = ['path1', '+'];

      const actualResult = PathUtil.hasWildCard(pathSelectorWithSingleLevelWildCard);
      expect(actualResult).toBeTruthy();
    });

    it('should return "true" when "pathSelector" contains multi level wildcard "#"', () => {
      const pathSelectorWithMultiLevelWildCard = ['path1', '#'];

      const actualResult = PathUtil.hasWildCard(pathSelectorWithMultiLevelWildCard);
      expect(actualResult).toBeTruthy();
    });
  });

  it('getChildPathSelector(pathSelector: IPathSelector)', () => {
    const pathSelector = ['path1', 'path2', 'path3'];
    const expectedChildPathSelector = ['path2', 'path3'];

    const actualResult = PathUtil.getChildPathSelector(pathSelector);
    expect(actualResult).toEqual(expectedChildPathSelector);
  });
});
