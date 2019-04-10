import { hasWildCard, createPathSelector } from './helpers';

class Xmess {
  id = '';
  channelTree = null;
  channelFactory = null;
  pluginList = [];

  constructor({ id, channelTree, channelFactory, plugins = [] }) {
    this.id = id;
    this.channelTree = channelTree;
    this.channelFactory = channelFactory;
    this.pluginList = plugins.map(plugin => {
      plugin.xmessInstance = this;
      return plugin;
    });

    this.initialize();
  }

  initialize() {
    this.hooks('initialize')();
  }

  channel(path) {
    this.hooks('channel')(path);

    let channel;
    const pathSelector = createPathSelector(path);

    const existingChannel = this.channelTree.getChannel(pathSelector);
    if (existingChannel) {
      channel = existingChannel;
    } else {
      channel = this.createChannel(path);
      this.channelTree.addChannel(pathSelector, channel);
    }

    return channel;
  }

  publish(path, payload, isInternal = false) {
    const pathSelector = createPathSelector(path);

    if (hasWildCard(pathSelector)) {
      throw new ReferenceError('Xmess does not support publish to wildcard!');
    }

    this.hooks('publish')(path, payload, isInternal);

    const channels = this.channelTree.getChannelList(pathSelector);
    channels.forEach(channel => channel.push({ path, payload }));
  }

  createChannel(path) {
    this.hooks('createChannel')(path);

    const initialMessage = this.getInitialMessage(path);
    const newChannel = this.channelFactory(path, {
      initialMessage: initialMessage,
      onPublish: this.onChannelPublish,
    });

    return newChannel;
  }

  onChannelPublish = (path, payload) => {
    this.publish(path, payload, true);
  }

  getInitialMessage(path) {
    const message = this.hooks('getInitialMessage')(path);
    return message;
  }

  hooks(hookName, initialSource) {
    return (...props) => this.pluginList.reduce((source, plugin) => {
      const hook = plugin.hooks[hookName];
      if (hook) {
        return hook(source, props) || source;
      }

      return source;
    }, initialSource);
  }
}

export { Xmess };
