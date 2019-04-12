import { Component, OnInit } from '@angular/core';
import { XmessService } from '@ciklum/ng-boilerplate';
import { Xmess, RepeaterPlugin } from '@ciklum/boilerplate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private messages = {
    angular: [],
    javascript: [],
  };

  private xmess = new Xmess({
    id: 'xmess-javascript',
    plugins: [
      new RepeaterPlugin(),
    ],
  });

  constructor(private xmessService: XmessService) {}

  public ngOnInit() {
    this.subscribeToRandomMessages();
    this.runRandomMessageGeneration();
  }

  private subscribeToRandomMessages() {
    this.xmessService.channel(`math/random/#`).subscribe((data) => {
      this.messages.angular.push(data);
    });

    this.xmess.channel(`math/random/#`).subscribe((data) => {
      this.messages.javascript.push(data);
    });
  }

  private runRandomMessageGeneration() {
    window.setInterval(() => {
      this.publishToPlain();
      window.setTimeout(() => this.publishToNg(), 2000);
    }, 4000);
  }

  private publishToNg() {
    const random = Math.random();
    console.log('[angular] publish', random);
    this.xmessService.channel(`math/random/${random}`).publish(random);
    return random;
  }

  private publishToPlain() {
    const random = Math.random();
    console.log('[javascript] publish', random);
    this.xmess.channel(`math/random/${random}`).publish(random);
    return random;
  }
}
