import { IChannel, IChannelMessage, IChannelSubscriber } from '../interfaces/channel.interface';

export class Channel implements IChannel {
  private readonly lastMessage: IChannelMessage;
  private readonly subscribers: IChannelSubscriber[] = [];

  constructor(
    public readonly path: string,
    public readonly publish: (payload: any) => void,
  ) {}

  public setInitialMessage(initialMessage: IChannelMessage): void {
    if (!this.lastMessage) {
      this.lastMessage = initialMessage;
    } else {
      throw new Error('Initial message cannot be set because channel already used');
    }
  }

  public subscribe(newSubscriber: IChannelSubscriber): void {
    if (this.lastMessage && this.lastMessage.payload) {
      newSubscriber(this.lastMessage);
    }

    this.subscribers.push(newSubscriber);
  }

  public next(message: IChannelMessage): void {
    this.lastMessage = message;
    this.subscribers.forEach(subscriber => subscriber(message));
  }
}
