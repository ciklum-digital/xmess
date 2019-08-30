import { Channel } from './classes/channel.class';
import { ChannelTree } from './classes/channel-tree.class';
import { PathUtil } from './utils/path.util';
import { Hook } from './classes/hook.class';

import { IXmess, XmessHookName, IXmessOptions } from './interfaces/xmess.interface';
import { IChannel, IChannelMessage } from './interfaces/channel.interface';
import { IHookSubscriber } from './interfaces/hook.interface';

export class Xmess implements IXmess {
  protected static channelFactory(path: string, onChannelPublish: (payload: any) => void): IChannel {
    return new Channel(path, onChannelPublish);
  }

  private channelTree = new ChannelTree();
  private hooks = {
    initialize: new Hook(),
    channelCreation: new Hook(),
    publish: new Hook(),
    destroy: new Hook(),
  };

  constructor(
    public readonly id: string,
    private readonly options?: IXmessOptions,
  ) {
    this.preInitialize();
    this.initialize();
  }

  public listenHook(hookName: XmessHookName, callback: IHookSubscriber): void {
    this.hooks[hookName].subscribe(callback);
  }

  public channel(path: string): IChannel {
    let channel: IChannel;
    const pathSelector = PathUtil.createSelector(path);

    const existingChannel = this.channelTree.getChannel(pathSelector);
    if (!existingChannel) {
      channel = this.createChannel(path);
      this.channelTree.addChannel(pathSelector, channel);
    } else {
      channel = existingChannel;
    }

    return channel;
  }

  public publish(message: IChannelMessage): void {
    const isInternal = message.initiatorId === this.id;
    const pathSelector = PathUtil.createSelector(message.path);

    if (PathUtil.hasWildCard(pathSelector)) {
      throw new ReferenceError('Xmess does not support publish to wildcard!');
    }

    const channelList = this.channelTree.getChannelList(pathSelector);
    channelList.forEach(channel => channel.next(message));

    this.hooks.publish.call(isInternal, message);
  }

  public destroy(): void {
    this.hooks.destroy.call();
  }

  private preInitialize(): void {
    const plugins = this.options && this.options.plugins || [];
    plugins.forEach(plugin => plugin.initialize(this));
  }

  private initialize(): void {
    this.hooks.initialize.call();
  }

  private createChannel(path: string): IChannel {
    const onChannelPublish = (payload: any) => this.publish({ path, payload, initiatorId: this.id });
    const channel = this.constructor['channelFactory'](path, onChannelPublish);

    this.hooks.channelCreation.call(channel);

    return channel;
  }
}
