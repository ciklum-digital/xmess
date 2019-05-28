import { IBaseObject } from '../../../shared/models';
import { IChannel } from './channel.interface';
import { IPathSelector } from './path.interface';


export interface IChannelList extends Array<IChannel> {}

export interface IChannelNode extends IBaseObject {
  __channel__?: IChannel;
}

export interface IChannelTree {
  getChannelList(parentPathSelector: IPathSelector): IChannelList;
  getChannel(pathSelector: IPathSelector): IChannel | null;
  addChannel(pathSelector: IPathSelector, channel: IChannel): void;
}
