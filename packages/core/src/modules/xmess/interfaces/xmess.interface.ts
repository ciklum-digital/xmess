import { IChannel, IChannelMessage } from './channel.interface';
import { IBaseObject } from './base-object.interface';

export interface IXmess extends IBaseObject {
  readonly id: string;
  listenHook(hookName: XmessHookName, callback: (...props: any[]) => void): void;
  channel(path: string): IChannel;
  publish(message: IChannelMessage): void;
}

export type XmessHookName = 'initialize' | 'publish' | 'channelCreation' | 'destroy';

export interface IXmessOptions {
  plugins: IXmessPlugin[];
}

export interface IXmessPlugin {
  initialize(xmessInstance: IXmess): void;
}
