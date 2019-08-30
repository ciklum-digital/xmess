import { IXmess, IChannelMessage } from '@xmess/core/dist/types';

import { IContext } from '../interfaces/context.interface';

export class Context implements IContext {
  private readonly lastMessages: { [key: string]: IChannelMessage } = {};
  private xmessInstanceList: IXmess[] = [];

  public registerInstance(xmessInstance: IXmess): void {
    const isIdUnique = this.isIdUnique(xmessInstance.id);
    if (!isIdUnique) {
      const errorMessage = `[@xmess/binder] Xmess(${xmessInstance.id}) is not unique!`;
      throw new ReferenceError(errorMessage);
    }

    this.xmessInstanceList.push(xmessInstance);
  }

  public removeInstance(xmessId: string): void {
    this.xmessInstanceList = this.xmessInstanceList.filter((xmessInstance: IXmess) => xmessInstance.id !== xmessId);
  }

  public update(message: IChannelMessage): void {
    this.lastMessages[message.path] = message;

    this.xmessInstanceList.forEach((xmessInstance: IXmess) => {
      const isNotInitiator = message.initiatorId !== xmessInstance.id;
      if (isNotInitiator) {
        xmessInstance.publish(message);
      }
    });
  }

  public getLastMessage(channelPath: string): IChannelMessage {
    return this.lastMessages[channelPath];
  }

  private isIdUnique(xmessId: string): boolean {
    return this.xmessInstanceList.every((xmessInstance: IXmess) => xmessInstance.id !== xmessId);
  }
}
