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
    this.hook('initialize')();
  }

  channel(path) {
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

  publish({ path, payload, initiatorId = this.id, isInternal = true }) {
    const pathSelector = createPathSelector(path);

    if (hasWildCard(pathSelector)) {
      throw new ReferenceError('Xmess does not support publish to wildcard!');
    }

    const channels = this.channelTree.getChannelList(pathSelector);
    channels.forEach(channel => channel.next({ path, payload, initiatorId }));

    this.hook('publish')(path, payload, isInternal);
  }

  createChannel(path) {
    const initialMessage = this.createInitialMessage(path);
    const newChannel = this.channelFactory(path, initialMessage, {
      onPublish: this.publish.bind(this),
    });

    return newChannel;
  }

  createInitialMessage(path) {
    const message = this.hook('createInitialMessage')(path);
    return message;
  }

  hook(hookName, initialSource) {
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
