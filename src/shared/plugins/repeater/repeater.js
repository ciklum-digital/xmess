class Repeater {
  subjects = {};
  translators = [];

  registerTranslator (translatorId, callback) {
    const isIdUnique = this.translators.every(translator => translator.id !== translatorId);
    if (isIdUnique) {
      this.translators.push({
        id: translatorId,
        translate: callback,
      });
    } else {
      const errorMessage = `[XMESS - Repeater] ${translatorId} is not unique. Translator did not register!`;
      throw new ReferenceError(errorMessage);
    }
  }

  removeTranslator (translatorId) {
    this.translators = this.translators.filter(translator => translator.id !== translatorId);
  }

  publish (translatorId, channelPath, data) {
    this.subjects[channelPath] = data;
    this.repeat(translatorId, channelPath, data);
  }

  repeat (translatorId, channelPath, data) {
    this.translators.forEach((translator) => {
      const isNotInitiator = translatorId !== translator.id;
      if (isNotInitiator) {
        translator.translate(channelPath, data);
      }
    })
  }

  getMessage (channelPath) {
    return this.subjects[channelPath];
  }
}

export { Repeater };
