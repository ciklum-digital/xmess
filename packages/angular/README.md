# @xmess/angular

## Overview

[there the place for OVERVIEW details...]

[please fill it for your module]

## Usage

1. Installing project dependencies
```bash
$ npm i @xmess/core @xmess/angular --save
```

2. Import `Xmess`, and provide base configuration
```typescript
import { XmessModule } from ng;

@NgModule({
  imports: [
    XmessModule.forRoot('some-id'),
  ],
})
```

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

## API

[there the place for API dateils..]

[please fill it for your module]   


## Examples

[there the place for EXAMPLES dateils..]    

[please fill it for your module]   


