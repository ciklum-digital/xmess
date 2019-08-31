import * as publicApi from './public-api';

describe('[Public Api]', () => {
  it('should exports "GlobalContextPlugin"', () => {
    expect(publicApi.GlobalContextPlugin).toBeTruthy();
  });
});
