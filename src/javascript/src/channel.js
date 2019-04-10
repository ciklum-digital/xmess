class Channel {
  listeners = [];

  constructor (path, options) {
    this.path = path;
    this.lastMessage = options.initialMessage;
    this.onPublish = options.onPublish;
  }

  subscribe (newListener) {
    this.listeners.push(newListener);

    return () => {
      if (this.listeners) {
        this.listeners = this.listeners.filter(listener => listener !== newListener);
      }
    };
  }

  subscribeWithLatest (newListener) {
    if (typeof this.lastMessage.payload !== 'undefined') {
      newListener(this.lastMessage);
    }

    return this.subscribe(newListener);
  }

  push (data) {
    this.lastMessage = data;
    this.listeners.forEach(listener => listener(data));
  }

  publish (payload) {
    this.onPublish(this.path, payload);
  }
}

export { Channel };
