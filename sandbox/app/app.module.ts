import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { XmessModule, RepeaterPlugin } from '@ciklum/ng-boilerplate';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    XmessModule.forRoot({
      id: 'xmess-angular',
      plugins: [
        new RepeaterPlugin(),
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
