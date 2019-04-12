import { Subject } from 'rxjs';

export class Channel extends Subject<any> {
  /* istanbul ignore next */
  constructor(
    private readonly path: string,
    initialMessage: any,
    private readonly options: any,
  ) {
    super();

    if (initialMessage) {
      this.next(initialMessage);
    }
  }

  publish(payload): void {
    this.options.onPublish({
      path: this.path,
      payload,
    });
  }
}
