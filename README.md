
# Warsaw Public API
Unofficial Node.js/Typescript bindings for [Warsaw Public API](https://api.um.warszawa.pl/)
## Installation
```bash
npm  install  threads-api
# or with yarn
yarn  add  threads-api
# or with pnpm
pnpm  install  threads-api
```
## Features
 - Fully typed
 - Supports keep alive
 - Supports retry
 - Supports custom axios instance
## Quick Start
Import using ES6 module:
```bash
import { WarsawPublicApi } from 'warsaw-public-api';
```
Import using commonJS:
```bash
const { WarsawPublicApi } = require('warsaw-public-api');
```
Below is example of usage TranpsortService
```Typescript
const api = new WarsawPublicApi({ apikey: YOUR_KEY });

api.transportApi
.getTransportBikeRoutes({ limit: 2 })
.then((res) =>  console.log(res.data.result))
.catch((error) =>  console.log(error.response));
```
## License
MIT
