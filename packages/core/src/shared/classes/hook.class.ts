import { IHook, IHookSubscriber } from '../interfaces/hook.interface';

export class Hook implements IHook {
  private subscribers: IHookSubscriber[] = [];

  public call (...props: any[]) {
    this.subscribers.forEach(subscriber => subscriber(...props));
  }

  public subscribe (subscriber: IHookSubscriber) {
    this.subscribers.push(subscriber);
  }
}
