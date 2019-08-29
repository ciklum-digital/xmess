import { IChannel, IChannelMessage } from './channel.interface';
import { IBaseObject } from '../../../shared/models';
import { IHook } from '../../../shared/interfaces/hook.interface';

export interface IXmess extends IBaseObject {
  readonly id: string;
  listenHook(hookName: XmessHook, callback: (...props: any[]) => void): void;
  channel(path: string): IChannel;
  publish(message: IChannelMessage): void;
}

type XmessHook = 'initialize' | 'publish' | 'channelCreation' | 'destroy';

export interface IXmessOptions {
  plugins: IXmessPlugin[];
}

export interface IXmessPlugin {
  initialize(xmessInstance: IXmess): void;
}
