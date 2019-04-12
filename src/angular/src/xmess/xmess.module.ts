import { Injector, ModuleWithProviders, NgModule, InjectionToken, Inject } from '@angular/core';
import { XmessService } from './xmess-service.stub';
import { Xmess, ChannelTree } from '../shared';
import { Channel } from './channel';

const defaultConfig = { id: 'ng-xmess', plugins: [] };

const XMESS_CONFIG_TOKEN = new InjectionToken<any>('XmessConfig');

@NgModule({})
export class XmessModule {
  static injector: Injector = undefined;

  constructor(private readonly injector: Injector) {
    XmessModule.injector = injector;
  }

  static forRoot(config = defaultConfig): ModuleWithProviders {
    return {
      ngModule: XmessModule,
      providers: [
        {
          provide: XmessService,
          useFactory: xmessServiceFactory,
          deps: [XMESS_CONFIG_TOKEN]
        },
        {
          provide: XMESS_CONFIG_TOKEN,
          useValue: config
        },
      ],
    };
  }
}

export function xmessServiceFactory({ id, plugins }) {
  const channelTree = new ChannelTree();

  return new Xmess({
    id: id,
    plugins,
    channelTree,
    channelFactory: (path, initialMessage, options) => new Channel(path, initialMessage, options),
  });
}
