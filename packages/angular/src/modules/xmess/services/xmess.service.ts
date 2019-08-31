import { Injectable } from '@angular/core';
import { Xmess } from '@xmess/core';

import { ObservableChannel } from '../classes/observable-channel.class';
import { IXmessModuleConfig } from '../interfaces/xmess-module.interface';

@Injectable()
export class XmessService extends Xmess {
  protected static channelFactory(path: string, onPublish: (payload: any) => void): ObservableChannel {
    return new ObservableChannel(path, onPublish);
  }

  constructor(private readonly config: IXmessModuleConfig) {
    super(config.id, config.options);
  }

  public channel(path: string): ObservableChannel {
    return super.channel(path) as ObservableChannel;
  }
}
