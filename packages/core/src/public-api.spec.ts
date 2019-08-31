import * as publicApi from './public-api';

describe('[Public Api]', () => {
  it('should exports "Xmess"', () => {
    expect(publicApi.Xmess).toBeTruthy();
  });
});
