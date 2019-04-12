class Channel {
  message = {};
  subscribers = [];

  constructor (path, initialMessage, options) {
    this.path = path;
    this.message = initialMessage || this.message;
    this.onPublish = options.onPublish;
  }

  subscribe (newSubscriber) {
    if (this.message.payload) {
      newSubscriber(this.message);
    }

    this.subscribers.push(newSubscriber);

    return () => {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== newSubscriber);
    };
  }

  next (payload) {
    this.message = payload;
    this.subscribers.forEach(subscriber => subscriber(payload));
  }

  publish (payload) {
    this.onPublish({
      path: this.path,
      payload,
    });
  }
}

export { Channel };
