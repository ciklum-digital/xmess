import { Component, OnInit } from '@angular/core';
import { XmessService } from '@ciklum/ng-boilerplate';
import { Xmess, RepeaterPlugin } from '@ciklum/boilerplate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngmodule-boilerplate';
  xmess = new Xmess({
    xmessId: 'xmess-plain',
    plugins: [
      new RepeaterPlugin(),
    ],
  });

  constructor(
    private xmessService: XmessService
  ) {
  }

  ngOnInit() {
    const channel = this.xmessService.channel('math/random/#');
    
    channel.subscribe((payload) => {
      console.log('ng', payload);
    });

    this.xmess.channel('math/random/#').subscribe((payload) => {
      console.log('plain', payload);
    });

    window.setInterval(() => {
      const random = Math.random();
      this.xmess.channel(`math/random/${random}`).publish(random);
    }, 1000);
  }
}
