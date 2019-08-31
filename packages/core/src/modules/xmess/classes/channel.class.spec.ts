import { Channel } from './channel.class';

describe('[Channel]', () => {
  let channelPath: string;
  let channel: Channel;
  let passedTestCases = 0;
  const channelMessage = {
    path: '',
    payload: 'some-payload',
    initiatorId: 'some-id',
  };

  beforeEach(() => {
    channelPath = `tests/test-${passedTestCases}`;
    channelMessage.path = channelPath;
    channel = new Channel(channelPath, () => {});
  });

  afterEach(() => {
    passedTestCases = passedTestCases + 1;
  });

  describe('setInitialMessage(initialMessage: IChannelMessage): void', () => {
    test('should set channel message', () => {
      channel.setInitialMessage(channelMessage);
    });

    test('should throw error if channel already has message', () => {
      channel.setInitialMessage(channelMessage);
      expect(() => channel.setInitialMessage(channelMessage)).toThrowError(Error);
    });
  });

  describe('subscribe(callback: IChannelSubscriber): void', () => {
    let subscribeCallback;

    beforeEach(() => {
      subscribeCallback = jest.fn();
    });

    test('should not fire callback if there isn`t at least one message', () => {
      channel.subscribe(subscribeCallback);
      expect(subscribeCallback).not.toHaveBeenCalled();
    });

    test('should fire callback if there is initial message', () => {
      channel.setInitialMessage(channelMessage);
      channel.subscribe(subscribeCallback);
      expect(subscribeCallback).toHaveBeenCalled();
    });

    test('should fire callback with object like "{ path, payload, initiatorId }"', () => {
      channel.setInitialMessage(channelMessage);
      channel.subscribe(subscribeCallback);
      expect(subscribeCallback).toHaveBeenCalledWith(channelMessage);
    });
  });

  describe('next(message: IChannelMessage): void', () => {
    test('should call subscribers', () => {
      const subscriber1 = jest.fn();
      const subscriber2 = jest.fn();

      channel.subscribe(subscriber1);
      channel.subscribe(subscriber2);
      channel.next(channelMessage);

      expect(subscriber1).toHaveBeenCalledWith(channelMessage);
      expect(subscriber2).toHaveBeenCalledWith(channelMessage);
    });
  });
});
