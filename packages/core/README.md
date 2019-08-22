# @xmess/core


## Overview

[there the place for OVERVIEW dateils..]

[please fill it for your module]

## Usage

1. Installing project dependency
```bash
$ npm i @xmess/core --save
```

2. Import `Xmess`, and provide base configuration
```typescript
import { Xmess } from '@xmess/core';

const xmess = new Xmess('some-id');
```

```typescript
import { IChannelMessage } from '@xmess/core/dist/types';

const sentMessageList: Array<IChannelMessage> = [];

xmess.channel('#').subscribe((message) => {
  sentMessageList.push(message);
});

function sendMessage(channelPath, payload) {
  xmess.channel(channelPath).publish();
}
```


## API

[there the place for API dateils..]

[please fill it for your module]   


## Examples

[there the place for EXAMPLES dateils..]    

[please fill it for your module]   



