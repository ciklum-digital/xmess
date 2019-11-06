# @xmess/global-context

## Overview

[there the place for OVERVIEW details...]

[please fill it for your module]

## Usage

1. Installing project dependencies
```bash
$ npm i @xmess/global-context --save
```

2. Import `BinderPlugin` and add to plugins
```typescript
import { Xmess } from '@xmess/core';
import { BinderPlugin } from '@xmess/global-context';

const xmess = new Xmess('some-id', {
  plugins: [
    new BinderPlugin(),
  ],
});
```

#### Without BinderPlugin
```typescript
const xmess1 = new Xmess('xmess-1');
const xmess2 = new Xmess('xmess-2');

xmess1.channel('some-channel').subscribe((message) => {
  // xmess1 isn't receiving messages from global context
});

xmess2.channel('some-channel').publish('some-message');
// xmess2 is sharing messages to global context

```


#### With BinderPlugin
```typescript
import { BinderPlugin } from '@xmess/global-context';

const xmess1 = new Xmess('xmess-1', {
  plugins: [
    new BinderPlugin(),
  ],
});

const xmess2 = new Xmess('xmess-2', {
  plugins: [
    new BinderPlugin(),
  ],
});

xmess1.channel('some-channel').subscribe((message) => {
  // xmess1 is receiving messages from global context
});

xmess2.channel('some-channel').publish('some-message');
// xmess1 is sharing messages to global context
```



## API

[there the place for API dateils..]

[please fill it for your module]   


## Examples

[there the place for EXAMPLES dateils..]    

[please fill it for your module]   
