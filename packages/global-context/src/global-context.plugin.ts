import { IXmess, IChannel, IXmessPlugin } from '@xmess/core/dist/types';

import { Context } from './classes/context.class';
import { GLOBAL_CONTEXT_WINDOW_KEY } from './constants/global-context.constant';
import { IContext } from './interfaces/context.interface';

export class GlobalContextPlugin implements IXmessPlugin {
  private get globalContext(): IContext {
    let globalContext = window[GLOBAL_CONTEXT_WINDOW_KEY];
    if (!globalContext) {
      globalContext = window[GLOBAL_CONTEXT_WINDOW_KEY] = new Context();
    }

    return globalContext;
  }

  public initialize(xmessInstance: IXmess): void {
    xmessInstance.listenHook('initialize', () => {
      this.globalContext.registerInstance(xmessInstance);
    });

    xmessInstance.listenHook('destroy', () => {
      this.globalContext.removeInstance(xmessInstance.id);
    });

    xmessInstance.listenHook('channelCreation', (channel: IChannel) => {
      const initialMessage = this.globalContext.getLastMessage(channel.path);
      if (initialMessage) {
        channel.setInitialMessage(initialMessage);
      }
    });

    xmessInstance.listenHook('publish', (isInternal, message) => {
      if (isInternal) {
        this.globalContext.update(message);
      }
    });
  }
}
