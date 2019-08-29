import { ChannelTree } from './channel-tree.class';
import { IChannel } from '../interfaces/channel.interface';

describe('[ChannelTree]', () => {
  let channelTree: ChannelTree;
  const baseChannel = { path: 'some-channel' } as IChannel;

  beforeEach(() => {
    channelTree = new ChannelTree();
  });

  describe('addChannel(pathSelector: IPathSelector, channel: IChannel): void', () => {
    it('should add "channel" to "rootChannelNode" according to "pathSelector"', () => {
      const pathSelector = ['path1', 'path2'];
      channelTree.addChannel(pathSelector, baseChannel);

      const expectedChannelTree = { path1: { path2: { __channel__: baseChannel } } };
      expect(channelTree).toHaveProperty('rootChannelNode', expectedChannelTree);
    });
  });

  describe('getChannel(pathSelector: IPathSelector): IChannel | null', () => {
    it('should return "channel" according to "pathSelector"', () => {
      const pathSelector = ['path1', 'path2'];
      channelTree.addChannel(pathSelector, baseChannel);

      const actualChannel = channelTree.getChannel(pathSelector);
      expect(actualChannel).toStrictEqual(baseChannel);
    });

    it('should return "null" if nothing found according to "pathSelector"', () => {
      const pathSelector = ['path1', 'path2'];

      const actualChannel = channelTree.getChannel(pathSelector);
      expect(actualChannel).toBe(null);
    });
  });

  describe('getChannelList(pathSelector: IPathSelector): IChannelList', () => {
    it('should return "channelList" with one channel according to "pathSelector"', () => {
      const pathSelector = ['path1', 'path2'];

      const channel = { path: pathSelector.join('/') } as IChannel;
      channelTree.addChannel(pathSelector, channel);

      const channelList = channelTree.getChannelList(pathSelector);
      expect(channelList).toStrictEqual([channel]);
    });

    it('should return "channelList" with single level wildcard channel matched to "pathSelector"', () => {
      const pathSelectorWithSingleLevelWildCard = ['path1', '+', 'path3'];
      const matchedChannelToSingleLevelWildCard = ['path1', 'path2', 'path3'];

      const channel = { path: pathSelectorWithSingleLevelWildCard.join('/') } as IChannel;
      channelTree.addChannel(pathSelectorWithSingleLevelWildCard, channel);

      const channelList = channelTree.getChannelList(matchedChannelToSingleLevelWildCard);
      expect(channelList).toStrictEqual([channel]);
    });

    it('should return "channelList" with multi level wildcard channels matched to "pathSelector"', () => {
      const pathSelectorWithMultiLevelWildCard = ['path1', '#'];
      const matchedChannelToMultiLevelWildCard = ['path1', 'path2'];

      const channel = { path: pathSelectorWithMultiLevelWildCard.join('/') } as IChannel;
      channelTree.addChannel(pathSelectorWithMultiLevelWildCard, channel);

      const channelList = channelTree.getChannelList(matchedChannelToMultiLevelWildCard);
      expect(channelList).toStrictEqual([channel]);
    });
  });
});
