import { IBaseObject } from '../../../shared/models';
import { IHook } from '../../../shared/interfaces/hook.interface';
import { IChannel, IChannelMessage } from './channel.interface';


export interface IXmess extends IBaseObject {
  readonly id: string;
  readonly hooks: IXmessHooks;
  channel(path: string): IChannel;
  publish(message: IChannelMessage): void;
}

export interface IXmessHooks {
  initialize: IHook;
  channelCreation: IHook;
  publish: IHook;
  destroy: IHook;
}

export interface IXmessOptions {
  plugins: Array<any>;
}
