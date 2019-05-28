import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { IXmessOptions } from '@xmess/core/dist/types';

import { XmessService } from './services/xmess.service';


@NgModule()
export class XmessModule {
  public static forRoot(id: string, options: IXmessOptions): ModuleWithProviders {
    const configToken = new InjectionToken(`@xmess-instance/${id}`);

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
          useValue: { id, options },
        },
      ],
    };
  }
}
