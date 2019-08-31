import { ReplaySubject } from 'rxjs';
import { IChannel, IChannelMessage } from '@xmess/core/dist/types';

export class ObservableChannel extends ReplaySubject<IChannelMessage> implements IChannel {
  /* istanbul ignore next */
  constructor(
    public readonly path: string,
    public readonly publish: (payload: any) => void,
  ) {
    super(1);
  }

  public setInitialMessage(initialMessage: IChannelMessage): void {
    if (initialMessage) {
      this.next(initialMessage);
    }
  }
}
