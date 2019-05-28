import { IXmess, IChannelMessage } from '@xmess/core/dist/types';
import { IGlobalContext } from '../interfaces/global-context.interface';


export class GlobalContext implements IGlobalContext {
  private lastMessages: { [key: string]: IChannelMessage } = {};
  private xmessInstanceList: Array<IXmess> = [];

  public registerInstance (newXmessInstance: IXmess): void {
    const isIdUnique = this.isIdUnique(newXmessInstance.id);
    if (!isIdUnique) {
      const errorMessage = `[@xmess/binder] Xmess(${newXmessInstance.id}) is not unique!`;
      throw new ReferenceError(errorMessage);
    }

    this.xmessInstanceList.push(newXmessInstance);
  }

  public update (message: IChannelMessage): void {
    this.lastMessages[message.path] = message;

    this.xmessInstanceList.forEach((xmessInstance: IXmess) => {
      const isNotInitiator = message.initiatorId !== xmessInstance.id;
      if (isNotInitiator) {
        xmessInstance.publish(message);
      }
    });
  }

  public getLastMessage (channelPath: string): IChannelMessage {
    const lastMessage = this.lastMessages[channelPath];
    return lastMessage;
  }

  public removeInstance (xmessId: string): void {
    this.xmessInstanceList = this.xmessInstanceList.filter((xmessInstance: IXmess) => {
      const shouldRemove = xmessInstance.id === xmessId;
      return !shouldRemove;
    });
  }

  private isIdUnique (xmessId: string): boolean {
    return this.xmessInstanceList.every((xmessInstance) => {
      const isNotEqual = xmessInstance.id !== xmessId;
      return isNotEqual;
    });
  }
}
