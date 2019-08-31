import { GlobalContextPlugin } from './global-context.plugin';
import { GLOBAL_CONTEXT_WINDOW_KEY } from './constants/global-context.constant';

const xmessId = 'xmess';
const xmessInstance = {
  id: xmessId,
  listenedHooks: {},
  listenHook: jest.fn((hookName, callback) => {
    xmessInstance.listenedHooks[hookName] = callback;
  }),
};

const channelPath = 'path';
let channel = {
  path: channelPath,
  setInitialMessage: jest.fn(),
};

const channelMessage = {
  path: channelPath,
  payload: {},
  initiatorId: xmessId,
};

describe('[GlobalContextPlugin]', () => {
  let globalContextPlugin: GlobalContextPlugin;

  beforeEach(() => {
    global['window'] = {};
    globalContextPlugin = new GlobalContextPlugin();
    globalContextPlugin.initialize(xmessInstance as any);
    channel.setInitialMessage.mockClear();
  });

  it('should register global context in "window"', () => {
    const globalContext = globalContextPlugin['globalContext'];

    expect(global['window'][GLOBAL_CONTEXT_WINDOW_KEY]).toStrictEqual(globalContext);
  });

  describe('initialize(xmessInstance: IXmess): void', () => {
    it('should register instance on "initialize" hook', () => {
      const spyOnRegisterInstance = jest.spyOn(globalContextPlugin['globalContext'], 'registerInstance');
      xmessInstance.listenedHooks['initialize']();

      expect(spyOnRegisterInstance).toHaveBeenCalledWith(xmessInstance);
    });

    it('should remove instance on "destroy" hook', () => {
      const spyOnRemoveInstance = jest.spyOn(globalContextPlugin['globalContext'], 'removeInstance');
      xmessInstance.listenedHooks['destroy']();

      expect(spyOnRemoveInstance).toHaveBeenCalledWith(xmessInstance.id);
    });

    it('should update global context on "publish" hook', () => {
      const spyOnUpdate = jest.spyOn(globalContextPlugin['globalContext'], 'update');
      xmessInstance.listenedHooks['publish'](true, channelMessage);

      expect(spyOnUpdate).toHaveBeenCalledWith(channelMessage);
    });

    it('should skip global context update on "publish" hook on external publishing', () => {
      const spyOnUpdate = jest.spyOn(globalContextPlugin['globalContext'], 'update');
      xmessInstance.listenedHooks['publish'](false, channelMessage);

      expect(spyOnUpdate).not.toHaveBeenCalledWith(channelMessage);
    });

    it('should set initial message to channel when message is existed in context', () => {
      const spyOnGetLastMessage = jest.spyOn(globalContextPlugin['globalContext'], 'getLastMessage');
      spyOnGetLastMessage.mockReturnValueOnce(channelMessage);
      xmessInstance.listenedHooks['channelCreation'](channel);

      expect(spyOnGetLastMessage).toHaveBeenCalledWith(channel.path);
      expect(channel.setInitialMessage).toHaveBeenCalledWith(channelMessage);
    });

    it('should skip initial message setting to channel when context is empty', () => {
      const spyOnGetLastMessage = jest.spyOn(globalContextPlugin['globalContext'], 'getLastMessage');
      xmessInstance.listenedHooks['channelCreation'](channel);

      expect(spyOnGetLastMessage).toHaveBeenCalledWith(channel.path);
      expect(channel.setInitialMessage).not.toHaveBeenCalledWith(channelMessage);
    });
  });
});
