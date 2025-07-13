# Dashboard

Dashboard React + Express untuk bot trading.

## Instalasi

```bash
npm install
npm run dev
```

### Build Production

```bash
npm run build
```

### Jalankan API

```bash
npm run start:api
```

### Integrasi dengan Bot

Tambahkan di `index.js` bot:

```js
const express = require('express');
const dashboard = require('./dashboard/api/server');
const app = express();
dashboard.mount(app);
app.use('/', express.static(require('path').join(__dirname,'dashboard','dist')));
```

Pastikan variabel lingkungan `DASHBOARD_JWT_SECRET` diisi.
