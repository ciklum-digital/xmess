class ChannelTree {
  channelTree = {};

  getChannelList(parentPathSelector, channelNode = this.channelTree) {
    if (parentPathSelector.length === 0) {
      const channel = this.getChannel([], channelNode);
      return channel ? [channel] : [];
    }

    let channelList = [];

    const key = parentPathSelector[0];
    const pathSelector = parentPathSelector.slice(1);
    const baseChannelNode = channelNode[key];
    if (baseChannelNode) {
      channelList = this.getChannelList(pathSelector, baseChannelNode);
    }

    const singleLevelChannelNode = channelNode['+'];
    if (singleLevelChannelNode) {
      const singleLevelchannelList = this.getChannelList(pathSelector, singleLevelChannelNode);
      channelList = [...channelList, ...singleLevelchannelList];
    }

    const multiLevelChannelNode = channelNode['#'];
    if (multiLevelChannelNode) {
      const channel = this.getChannel([], multiLevelChannelNode);
      channelList = channel ? [...channelList, channel] : channelList;
    }

    return channelList;
  }

  getChannel(pathSelector, parentChannelNode) {
    const hasPathSelector = pathSelector.length !== 0;
    const channelNode = hasPathSelector ? this.getChannelNode(pathSelector, parentChannelNode) : parentChannelNode;

    return channelNode['__channel__'] || null;
  }

  addChannel(pathSelector, channel) {
    const channelNode = this.getChannelNode(pathSelector);
    channelNode['__channel__'] = channel;
  }

  getChannelNode(parentPathSelector, channelNode = this.channelTree) {
    const key = parentPathSelector[0];

    if (!channelNode[key]) {
      this.addChannelNode(key, channelNode);
    }

    const pathSelector = parentPathSelector.slice(1);
    if (pathSelector.length !== 0) {
      return this.getChannelNode(pathSelector, channelNode[key]);
    }

    return channelNode[key];
  }

  addChannelNode(channelNodeName, channelNode) {
    channelNode[channelNodeName] = {};
  }
}

export { ChannelTree };
