class Repeater {
  messages = {};
  translators = [];

  registerTranslator (xmessId, callback) {
    const isIdUnique = this.translators.every(translator => translator.id !== xmessId);
    if (isIdUnique) {
      this.translators.push({
        id: xmessId,
        translate: callback,
      });
    } else {
      const errorMessage = `[XMESS-Repeater] XmessId(${xmessId}) is not unique. Translator did not register!`;
      throw new ReferenceError(errorMessage);
    }
  }

  removeTranslator (translatorId) {
    this.translators = this.translators.filter(translator => translator.id !== translatorId);
  }

  repeat (initiatorId, path, payload) {
    this.messages[path] = { initiatorId, path, payload };

    this.translators.forEach((translator) => {
      const isNotInitiator = initiatorId !== translator.id;
      if (isNotInitiator) {
        translator.translate(initiatorId, path, payload);
      }
    })
  }

  getMessage (path) {
    const message = this.messages[path];
    return message;
  }
}

export { Repeater };
