import { PathUtil } from '../utils/path.util';
import { IChannel } from '../interfaces/channel.interface';
import { IChannelTree, IChannelNode, IChannelList } from '../interfaces/channel-tree.interface';
import { IPathSelector } from '../interfaces/path.interface';

export class ChannelTree implements IChannelTree {
  private rootChannelNode: IChannelNode = {};

  public addChannel(pathSelector: IPathSelector, channel: IChannel): void {
    const channelNode = this.getChannelNode(pathSelector);
    channelNode.__channel__ = channel;
  }

  public getChannel(pathSelector: IPathSelector): IChannel | null {
    const channelNode = this.getChannelNode(pathSelector);

    return this.getChannelFromNode(channelNode);
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
      const channel = this.getChannelFromNode(channelNode);
      channelList = channel ? [channel] : channelList;
    }

    return channelList;
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
