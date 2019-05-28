# @xmess/core

## Table of contents

1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)


### Description
---

### Installation
---

1. Installing project dependency
```bash
$ npm i @xmess/core --save
```

2. Import `Xmess`, and provide base configuration
```typescript
import { Xmess } from '@xmess/core';

const xmess = new Xmess('some-id');
```

### Usage
---

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

### API
---


