import { IXmess, IChannel } from '@xmess/core/dist/types';

import { GlobalContext } from './classes/global-context.class';
import { GlobalUtil } from './utils/global.util';
import { IGlobalContext } from './interfaces/global-context.interface';

export class BinderPlugin {
  private get globalContext(): IGlobalContext {
    let globalContext = GlobalUtil.get('globalContext');
    if (!globalContext) {
      globalContext = new GlobalContext();
      GlobalUtil.set('globalContext', globalContext);
    }

    return globalContext;
  }

  public initialize(xmessInstance: IXmess): void {
    xmessInstance.hooks.initialize.subscribe(() => {
      this.globalContext.registerInstance(xmessInstance);
    });

    xmessInstance.hooks.channelCreation.subscribe((channel: IChannel) => {
      const initialMessage = this.globalContext.getLastMessage(channel.path);
      if (initialMessage) {
        channel.setInitialMessage(initialMessage);
      }
    });

    xmessInstance.hooks.publish.subscribe((isInternal, message) => {
      if (isInternal) {
        this.globalContext.update(message);
      }
    });
  }
}
