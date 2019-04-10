import { Repeater } from './repeater';

const REPEATER_WINDOW_KEY = 'xmess/repeater';

class RepeaterPlugin {
  constructor() {
    this.hooks = {
      initialize: () => this.initializeHook(),
      publish: (sources, [path, payload, isInternal]) => this.publishHook(path, payload, isInternal),
      getInitialMessage: (sources, [path]) => this.getInitialMessageHook(path),
    };
  }

  initializeHook() {
    this.repeater = window[REPEATER_WINDOW_KEY] || new Repeater();
    window[REPEATER_WINDOW_KEY] = this.repeater;

    this.repeater.registerTranslator(this.xmessInstance.id, this.repeaterCallback)
  }

  repeaterCallback = (path, payload) => {
    this.xmessInstance.publish(path, payload);
  }

  publishHook(path, payload, isInternal) {
    if (isInternal) {
      const translatorId = this.xmessInstance.id;
      this.repeater.publish(translatorId, path, payload);
    }
  }

  getInitialMessageHook(path) {
    return this.repeater.getMessage(path);
  }
}

export { RepeaterPlugin };
