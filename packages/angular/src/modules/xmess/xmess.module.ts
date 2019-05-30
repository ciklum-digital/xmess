import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { IXmessOptions } from '@xmess/core/dist/types';
import { XmessService } from './services/xmess.service';

const configToken = new InjectionToken(`@xmess/angular/config`);

@NgModule()
export class XmessModule {
  public static forRoot(id: string, options: IXmessOptions): ModuleWithProviders {
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
