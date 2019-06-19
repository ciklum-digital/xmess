import { Subject } from 'rxjs';
import { IChannel } from '@xmess/core/dist/types';

export class Channel extends Subject<any> implements IChannel {
  constructor(
    public readonly path: string,
    public readonly publish: (payload: any) => void,
  ) {
    super();
  }

  public setInitialMessage(initialMessage) {
    if (initialMessage) {
      this.next(initialMessage);
    }
  }
}
