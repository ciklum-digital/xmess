import { ReplaySubject } from 'rxjs';
import { ObservableChannel } from './observable-channel.class';

const channelPath = 'path';
const onChannelPublish = (payload: any) => {};
const channelMessage = { path: '', payload: '', initiatorId: '' };

describe('[ObservableChannel]', () => {
  let observableChannel: ObservableChannel;

  beforeEach(() => {
    observableChannel = new ObservableChannel(channelPath, onChannelPublish);
  });

  it('should extend ReplaySubject', () => {
    expect(observableChannel).toBeInstanceOf(ReplaySubject);
  });

  describe('constructor(public readonly path: string, public readonly publish: (payload: any) => void)', () => {
    it('instance should provide "path" property', () => {
      expect(observableChannel.path).toEqual(channelPath);
    });

    it('instance should provide publish(payload: any): void', () => {
      expect(observableChannel.publish).toEqual(onChannelPublish);
    });
  });

  describe('setInitialMessage(initialMessage: IChannelMessage): void', () => {
    it('should call "next(initialMessage: IChannelMessage)"', () => {
      const spyOnNext = jest.spyOn(observableChannel, 'next');
      observableChannel.setInitialMessage(channelMessage);
      expect(spyOnNext).toHaveBeenCalledWith(channelMessage);
    });

    it('should not call "next(initialMessage: IChannelMessage)" when initialMessage is undefined', () => {
      const emptyMessage = void(0);
      const spyOnNext = jest.spyOn(observableChannel, 'next');

      observableChannel.setInitialMessage(emptyMessage);
      expect(spyOnNext).not.toHaveBeenCalledWith(emptyMessage);
    });
  });

  describe('subscribe(subscriber: IChannelSubscriber): void', () => {
    it('should emit only last value', () => {
      const subscriber = jest.fn();
      const lastMessage = { ...channelMessage, payload: 'lastMessage' };
      observableChannel.next(channelMessage);
      observableChannel.next(lastMessage);

      observableChannel.subscribe(subscriber);
      expect(subscriber).toHaveBeenCalledWith(lastMessage);
      expect(subscriber).not.toHaveBeenCalledWith(channelMessage);
    });
  });
});
