import { Xmess as SharedXmess, ChannelTree } from '@shared';
import { Channel } from './channel';

const defaultConfig = { id: 'xmess-id', plugins: [] };

export const Xmess = function (config = defaultConfig) {
  const channelTree = new ChannelTree();
  const channelFactory = (path, options) => new Channel(path, options);

  return new SharedXmess({
    id: config.id,
    plugins: config.plugins,
    channelTree,
    channelFactory,
  });
};
