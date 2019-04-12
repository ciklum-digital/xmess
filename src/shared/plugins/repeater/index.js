import { Repeater } from './repeater';

const REPEATER_WINDOW_KEY = '@xmess/repeater';

class RepeaterPlugin {
  xmessInstance = null;

  constructor() {
    this.hooks = {
      initialize: () => this.onInitialize(),
      publish: (sources, [path, payload, isInternal]) => this.onPublish(path, payload, isInternal),
      createInitialMessage: (sources, [path]) => this.onCreateInitialMessage(path),
    };
  }

  onInitialize() {
    this.repeater = window[REPEATER_WINDOW_KEY] || new Repeater();
    window[REPEATER_WINDOW_KEY] = this.repeater;

    this.repeater.registerTranslator(this.xmessInstance.id, this.repeaterCallback)
  }

  repeaterCallback = (initiatorId, path, payload) => {
    this.xmessInstance.publish({
      path,
      payload,
      initiatorId,
      isInternal: false,
    });
  };

  onPublish(path, payload, isInternal) {
    if (isInternal) {
      const translatorId = this.xmessInstance.id;
      this.repeater.repeat(translatorId, path, payload);
    }
  }

  onCreateInitialMessage(path) {
    return this.repeater.getMessage(path);
  }
}

export { RepeaterPlugin };
