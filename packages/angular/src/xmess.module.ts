import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

import { XmessService } from './services/xmess.service';
import { IXmessModuleConfig } from './interfaces/xmess-module.interface';

const configToken = new InjectionToken('@xmess/angular/config');

@NgModule()
export class XmessModule {
  public static forRoot(config: IXmessModuleConfig): ModuleWithProviders {
    return {
      ngModule: XmessModule,
      providers: [
        {
          provide: XmessService,
          useClass: XmessService,
          deps: [configToken],
        },
        {
          provide: configToken,
          useValue: config,
        },
      ],
    };
  }
}
