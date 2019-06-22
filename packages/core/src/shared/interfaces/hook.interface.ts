export interface IHook {
  call(...props: any[]): void;
  subscribe(subscriber: IHookSubscriber): void;
}

export interface IHookSubscriber {
  (...props: any[]): void;
}
