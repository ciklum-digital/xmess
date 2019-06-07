# @xmess/core

## Table of contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)


### Description
---
[should be added here]

### Installation
---

1. Installing project dependencies
```bash
$ npm i @xmess/core @xmess/angular --save
```

2. Import `Xmess`, and provide base configuration
```typescript
import { XmessModule } from '@xmess/angular';

@NgModule({
  imports: [
    XmessModule.forRoot('some-id'),
  ],
})
```

### Usage
---

```typescript
import { XmessService } from '@xmess/angular';
import { IChannelMessage } from '@xmess/core/dist/types';

@Component({
  // ...
})
export class SomeComponent() {
  private sentMessageList: Array<IChannelMessage> = [];

  constructor(private xmessService: XmessService) {
    this.subscribeToAllMessages();
  }

  public sendMessage(channelPath, payload) {
    this.xmessService.channel(channelPath).publish(payload);
  }

  private subscribeToAllMessages() {
    this.xmessService.channel('#').subscribe((message) => {
      this.receivedMessageList.push(message);
    });
  }
}
```

### API
---


