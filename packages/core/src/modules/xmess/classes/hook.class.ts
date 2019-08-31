import { IHook, IHookSubscriber } from '../interfaces/hook.interface';

export class Hook implements IHook {
  private readonly subscribers: IHookSubscriber[] = [];

  public call(...props: any[]): void {
    this.subscribers.forEach((subscriber: IHookSubscriber) => subscriber(...props));
  }

  public subscribe(subscriber: IHookSubscriber): void {
    this.subscribers.push(subscriber);
  }
}
