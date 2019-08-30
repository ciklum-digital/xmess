import * as get from 'lodash/get';
import * as set from 'lodash/set';

import { PathUtil } from '../utils/path.util';
import { IChannel } from '../interfaces/channel.interface';
import { IChannelTree, IChannelNode, IChannelList } from '../interfaces/channel-tree.interface';
import { IPathSelector } from '../interfaces/path.interface';

export class ChannelTree implements IChannelTree {
  private readonly rootChannelNode: IChannelNode = {};

  private static getChannelFromNode(channelNode: IChannelNode): IChannel | null {
    return channelNode.__channel__ || null;
  }

  public addChannel(pathSelector: IPathSelector, channel: IChannel): void {
    set(this.rootChannelNode, [...pathSelector, '__channel__'], channel);
  }

  public getChannel(pathSelector: IPathSelector): IChannel | null {
    const channelNode: IChannelNode = get(this.rootChannelNode, pathSelector);

    return channelNode ? ChannelTree.getChannelFromNode(channelNode) : null;
  }

  public getChannelList(pathSelector: IPathSelector): IChannelList {
    return this.getChannelListByPathSelector(pathSelector, this.rootChannelNode);
  }

  private getChannelListByPathSelector(pathSelector: IPathSelector, channelNode: IChannelNode): IChannelList {
    const childPathSelector = PathUtil.getChildPathSelector(pathSelector);
    const baseChannelList = this.getChannelListFromNode(channelNode[pathSelector[0]], childPathSelector);
    const singleLevelWildcardChannelList = this.getChannelListFromNode(channelNode['+'], childPathSelector);
    const multiLevelWildcardChannelList = this.getChannelListFromNode(channelNode['#']);

    return [
      ...baseChannelList,
      ...singleLevelWildcardChannelList,
      ...multiLevelWildcardChannelList,
    ];
  }

  private getChannelListFromNode(channelNode: IChannelNode, pathSelector: IPathSelector = []): IChannelList {
    let channelList: IChannelList = [];

    const hasPathSelector = pathSelector.length !== 0;
    if (channelNode && hasPathSelector) {
      channelList = this.getChannelListByPathSelector(pathSelector, channelNode);
    } else if (channelNode) {
      const channel = ChannelTree.getChannelFromNode(channelNode);
      channelList = channel ? [channel] : channelList;
    }

    return channelList;
  }
}
