import { Injectable } from '@angular/core';
import { Xmess } from '@xmess/core';
import { IChannel } from '@xmess/core/dist/types';

import { Channel } from '../classes/channel.class';

@Injectable()
export class XmessService extends Xmess {
  protected static channelFactory (path: string, onPublish: (payload: any) => void): IChannel {
    return new Channel(path, onPublish);
  }

  constructor (private config: any) {
    super(config.id, config.options);
  }
}
