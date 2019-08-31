import * as publicApi from './public-api';

describe('[Public Api]', () => {
  it('should exports "XmessService"', () => {
    expect(publicApi.XmessService).toBeTruthy();
  });

  it('should exports "XmessModule"', () => {
    expect(publicApi.XmessModule).toBeTruthy();
  });
});
