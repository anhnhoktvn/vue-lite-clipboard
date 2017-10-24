# vue-lite-clipboard

> Copy text to clipboard

## Requirements

- vue: ^2.0.0

## Install

From npm:

``` sh
$ npm install vue-lite-clipboard --save
```

## use

``` js
import Vue from 'vue';
import { VueLiteClipboard } from 'vue-lite-clipboard';

Vue.use(VueLiteClipboard)

...

<button type="button" @click="$toClipboard('text')">coty text</button>

```




## License

[MIT](https://opensource.org/licenses/MIT)
