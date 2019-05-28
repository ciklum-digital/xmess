import { IHook, IHookSubscriber } from '../interfaces/hook.interface';


export class Hook implements IHook {
  private subscribers: Array<IHookSubscriber> = [];

  public call(...props: Array<any>) {
    this.subscribers.forEach(subscriber => subscriber(...props));
  }

  public subscribe(subscriber: IHookSubscriber) {
    this.subscribers.push(subscriber);
  }
}
