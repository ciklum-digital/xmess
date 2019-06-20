import { IChannel } from '../interfaces/channel.interface';
import { IChannelTree, IChannelNode, IChannelList } from '../interfaces/channel-tree.interface';
import { IPathSelector } from '../interfaces/path.interface';
import { PathUtil } from '../utils/path.util';

export class ChannelTree implements IChannelTree {
  private rootChannelNode: IChannelNode = {};

  public getChannelList(pathSelector: IPathSelector, channelNode = this.rootChannelNode): IChannelList {
    let channelList: IChannelList = [];

    if (pathSelector.length === 0) {
      const channel = this.getChannelFromNode(channelNode);
      channelList = channel ? [channel] : channelList;

      return channelList;
    }

    const pathItem = pathSelector[0];
    const childPathSelector = PathUtil.getChildPathSelector(pathSelector);
    const baseChannelNode = channelNode[pathItem];
    if (baseChannelNode) {
      channelList = this.getChannelList(childPathSelector, baseChannelNode);
    }

    const singleLevelChannelNode = channelNode['+'];
    if (singleLevelChannelNode) {
      const singleLevelChannelList = this.getChannelList(childPathSelector, singleLevelChannelNode);
      channelList = [...channelList, ...singleLevelChannelList];
    }

    const multiLevelChannelNode = channelNode['#'];
    if (multiLevelChannelNode) {
      const channel = this.getChannelFromNode(multiLevelChannelNode);
      channelList = channel ? [...channelList, channel] : channelList;
    }

    return channelList;
  }

  public getChannel(pathSelector: IPathSelector): IChannel | null {
    const channelNode = this.getChannelNode(pathSelector);

    return this.getChannelFromNode(channelNode);
  }

  public addChannel(pathSelector: IPathSelector, channel: IChannel): void {
    const channelNode = this.getChannelNode(pathSelector);
    channelNode.__channel__ = channel;
  }

  private getChannelFromNode(channelNode: IChannelNode): IChannel | null {
    return channelNode.__channel__ || null;
  }

  private getChannelNode(pathSelector: IPathSelector, channelNode = this.rootChannelNode): IChannelNode {
    const key = pathSelector[0];
    const childPathSelector = PathUtil.getChildPathSelector(pathSelector);

    if (!channelNode[key]) {
      channelNode[key] = {};
    }

    const isLastPathSlise = childPathSelector.length === 0;
    if (isLastPathSlise) {
      return channelNode[key];
    }

    return this.getChannelNode(childPathSelector, channelNode[key]);
  }
}
