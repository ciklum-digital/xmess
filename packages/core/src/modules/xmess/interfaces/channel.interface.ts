export interface IChannel {
  readonly path: string;
  setInitialMessage (message: IChannelMessage): void;
  next (message: IChannelMessage): void;
  subscribe (subscriber: IChannelSubscriber): void;
  publish (payload: any): void;
}

export interface IChannelSubscriber {
  (message: IChannelMessage): void;
}

export interface IChannelMessage {
  path: string;
  payload: any;
  initiatorId: string;
}
