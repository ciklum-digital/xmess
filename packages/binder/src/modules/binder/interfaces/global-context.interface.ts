import { IXmess, IChannelMessage } from '@xmess/core/dist/types';

export interface IGlobalContext {
  update(message: IChannelMessage): void;
  getLastMessage(channelPath: string): IChannelMessage;
  registerInstance(xmessInstance: IXmess): void;
  removeInstance(xmessId: string): void;
}
