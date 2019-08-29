import { Xmess } from './xmess';
import { IXmess, IXmessPlugin } from './interfaces/xmess.interface';
import { Channel } from './classes/channel.class';

class StubPlugin implements IXmessPlugin {
  initialize(xmessInstance: IXmess): void {}
}

const xmessId = 'id';
const channelPath = 'path';
const channelMessage = {
  path: channelPath,
  payload: {},
  initiatorId: xmessId,
};

const stubPlugin = new StubPlugin();
const xmessOptions = {
  plugins: [stubPlugin],
};

describe('[Xmess]', () => {
  let xmess: IXmess;

  beforeEach(() => {
    xmess = new Xmess(xmessId);
  });

  describe('constructor(public readonly id: string, private readonly options?: IXmessOptions)', () => {
    it('should initialize plugins', () => {
      const spyOnPluginInitialize = jest.spyOn(stubPlugin, 'initialize');
      const xmessInstance = new Xmess(xmessId, xmessOptions);

      expect(spyOnPluginInitialize).toBeCalledWith(xmessInstance);
    });
  });

  describe('channel(path: string): IChannel', () => {
    it('should create and return channel if channel with such path doesn\'t exist', () => {
      const channel = xmess.channel(channelPath);
      expect(channel).toBeInstanceOf(Channel);
    });

    it('should return existed channel if channel with such path does exist', () => {
      const newChannel = xmess.channel(channelPath);
      newChannel['isNewChannel'] = true;

      const existedChannel = xmess.channel(channelPath);
      expect(existedChannel).toStrictEqual(newChannel);
    });

    it('should publish messages with initiatorId === xmess.id', () => {
      const spyOnPublish = jest.spyOn(xmess, 'publish');
      xmess.channel('path').publish({});

      expect(spyOnPublish).toHaveBeenLastCalledWith({
        path: 'path',
        payload: {},
        initiatorId: xmess.id,
      });
    });
  });

  describe('listenHook(hookName: string, callback): void', () => {
    it('should subscribe to hook by name', () => {
      const hookName = 'initialize';
      const spyOnInitializeHookSubscribe = jest.spyOn(xmess['hooks'][hookName], 'subscribe');

      xmess.listenHook(hookName, () => {});
      expect(spyOnInitializeHookSubscribe).toHaveBeenCalled();
    });
  });

  describe('publish(message: IChannelMessage): void', () => {
    it('should publish to channels by "path"', () => {
      const channel = xmess.channel(channelPath);
      const spyOnChannelNext = jest.spyOn(channel, 'next');

      xmess.publish(channelMessage);
      expect(spyOnChannelNext).toHaveBeenCalledWith(channelMessage);
    });

    it('should throw ReferenceError on publishing to path with wildcard', () => {
      const publishingWithWildCard = () => xmess.publish({ path: '#', initiatorId: xmess.id, payload: {} });

      expect(publishingWithWildCard).toThrowError(ReferenceError);
    });
  });

  describe('destroy(): void', () => {
    it('should call destroy hook', () => {
      const spyOnDestroyHookCall = jest.spyOn(xmess['hooks']['destroy'], 'call');

      xmess.destroy();
      expect(spyOnDestroyHookCall).toHaveBeenCalledWith();
    });
  });
});
