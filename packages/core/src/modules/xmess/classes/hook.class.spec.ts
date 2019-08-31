import { Hook } from './hook.class';

describe('[Hook]', () => {
  let hook: Hook;
  let subscriber;

  beforeEach(() => {
    hook = new Hook();
    subscriber = jest.fn();
  });

  describe('public subscribe(subscriber: IHookSubscriber): void', () => {
    it('should add subscriber to "subscribers" array', () => {
      hook.subscribe(subscriber);
      expect(hook['subscribers']).toEqual([subscriber]);
    });
  });

  describe('call(...props: any[]): void', () => {
    it('should call "subscribers"', () => {
      hook.subscribe(subscriber);
      hook.call();

      expect(subscriber).toHaveBeenCalled();
    });

    it('should provide all "props" into "subscribers"', () => {
      const props = [{}, [], ''];
      hook.subscribe(subscriber);
      hook.call(...props);

      expect(subscriber).toHaveBeenCalledWith(...props);
    });
  });
});
