export interface IHook {
  call(...props: Array<any>): void;
  subscribe(subscriber: IHookSubscriber): void;
}

export interface IHookSubscriber {
  (...props: Array<any>): void;
}
