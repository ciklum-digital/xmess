import { ReplaySubject } from 'rxjs';

export class Channel extends ReplaySubject<any> {
  /* istanbul ignore next */
  constructor(
    private readonly path: string,
    private readonly options: any,
  ) {
    super(1);

    const { initialMessage } = this.options;
    if (initialMessage) {
      this.push({ path: this.path, payload: initialMessage });
    }
  }

  push(data: any) {
    this.next(data);
  }

  publish(payload): void {
    this.options.onPublish(this.path, payload);
  }
}
