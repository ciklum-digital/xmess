import { Xmess } from '@xmess/core';

import { XmessService } from './xmess.service';
import { ObservableChannel } from '../classes/observable-channel.class';

describe('[XmessService]', () => {
  let xmessService: XmessService;

  beforeEach(() => {
    xmessService = new XmessService({ id: '' });
  });

  it('should extend Xmess from "xmess/core"', () => {
    expect(xmessService).toBeInstanceOf(Xmess);
  });

  describe('channel(path: string): ObservableChannel', () => {
    it('should return ObservableChannel instead of Channel', () => {
      const observableChannel = xmessService.channel('path');
      expect(observableChannel).toBeInstanceOf(ObservableChannel);
    });
  });
});
