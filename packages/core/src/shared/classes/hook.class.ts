import { IHook, IHookSubscriber } from '../interfaces/hook.interface';

export class Hook implements IHook {
  private subscribers: IHookSubscriber[] = [];

  public call(...props: any[]): void {
    this.subscribers.forEach(subscriber => subscriber(...props));
  }

  public subscribe(subscriber: IHookSubscriber): void {
    this.subscribers.push(subscriber);
  }
}
