import { Xmess } from '@xmess/core';

import { Context } from './context.class';

const xmessId = 'xmess';
const xmessInstance = new Xmess(xmessId);
const channelMessage = { path: 'path', payload: '', initiatorId: '' };

describe('[Context]', () => {
  let context: Context;

  beforeEach(() => {
    context = new Context();
  });

  describe('registerInstance(xmessInstance: IXmess): void', () => {
    it('should add "xmessInstance" to "xmessInstanceList"', () => {
      context.registerInstance(xmessInstance);
      expect(context).toHaveProperty('xmessInstanceList', [xmessInstance]);
    });

    it('shouldn\'t add "xmessInstance" to "xmessInstanceList" and throw "ReferenceError"', () => {
      const xmessWithExistedId = new Xmess(xmessId);
      const registerInstanceWithExistedId = () => context.registerInstance(xmessWithExistedId);

      context.registerInstance(xmessInstance);

      expect(context).toHaveProperty('xmessInstanceList', [xmessInstance]);
      expect(registerInstanceWithExistedId).toThrowError(ReferenceError);
      expect(context).toHaveProperty('xmessInstanceList', [xmessInstance]);
    });
  });

  describe('removeInstance(xmessId: string): void', () => {
    it('should remove "xmessInstance" from "xmessInstanceList"', () => {
      context.registerInstance(xmessInstance);
      context.removeInstance(xmessInstance.id);

      expect(context).toHaveProperty('xmessInstanceList', []);
    });
  });

  describe('update(message: IChannelMessage): void', () => {
    const secondXmessId = 'second-xmess';
    const secondXmessInstance = new Xmess(secondXmessId);

    it('should publish message to all instances', () => {
      const spyOnXmessInstancePublish = jest.spyOn(xmessInstance, 'publish');
      const spyOnSecondXmessInstancePublish = jest.spyOn(secondXmessInstance, 'publish');
      context.registerInstance(xmessInstance);
      context.registerInstance(secondXmessInstance);

      context.update(channelMessage);

      expect(spyOnXmessInstancePublish).toHaveBeenCalledWith(channelMessage);
      expect(spyOnSecondXmessInstancePublish).toHaveBeenCalledWith(channelMessage);
    });

    it('should publish message to all instances besides initiator', () => {
      const spyOnXmessInstancePublish = jest.spyOn(xmessInstance, 'publish');
      const spyOnSecondXmessInstancePublish = jest.spyOn(secondXmessInstance, 'publish');
      context.registerInstance(xmessInstance);
      context.registerInstance(secondXmessInstance);

      const channelMessageFromXmess = { ...channelMessage, initiatorId: xmessId };
      context.update(channelMessageFromXmess);

      expect(spyOnXmessInstancePublish).not.toHaveBeenCalledWith(channelMessageFromXmess);
      expect(spyOnSecondXmessInstancePublish).toHaveBeenCalledWith(channelMessageFromXmess);
    });
  });

  describe('getLastMessage(channelPath: string): IChannelMessage', () => {
    it('should return last "channelMessage"', () => {
      context.update(channelMessage);
      const actualChannelMessage = context.getLastMessage(channelMessage.path);
      expect(actualChannelMessage).toStrictEqual(channelMessage);
    });
  });
});
