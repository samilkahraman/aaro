# Aaro REST API - JavaScript Library

New JavaScript library for Aaro REST API, supports CommonJS (CJS).

Requests are made with [Axios library](https://github.com/axios/axios) with [support to promises](https://github.com/axios/axios#promises).

[![GitHub issues](https://img.shields.io/github/issues/samilkahraman/aaro)](https://github.com/samilkahraman/aaro/issues)
[![GitHub license](https://img.shields.io/github/license/samilkahraman/aaro)](https://github.com/samilkahraman/aaro/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/aaro.svg)](https://www.npmjs.com/package/aaro)

## Installation

```
npm install --save aaro
```

## Getting started

Generate API credentials (Bearer Token) following this instructions <https://aaro-api.netlify.app/#authentication/>
.

Check out the Aaro API endpoints and data that can be manipulated in <https://aaro-api.netlify.app/>.

## Setup

### CJS example:

```js
const Aaro = require('aaro');

const aaro = new Aaro({
    baseUrl: 'https://erp.aaro.com.tr',
    accessToken: 'OMBwgauc1HwRBxBA...',
});
```

### Options

| Option         | Type      | Required | Description                                                                                                         |
| -------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `baseUrl`      | `String`  | yes      | Your Erp URL, example: https://erp.aaro.com.tr                                                                      |
| `accessToken ` | `String`  | yes      | Your bearer token                                                                                                   |
| `encoding`     | `String`  | no       | Encoding, default is 'utf-8'                                                                                        |
| `timeout`      | `Integer` | no       | Define the request timeout                                                                                          |
| `axiosConfig`  | `Object`  | no       | Define the custom [Axios config](https://github.com/axios/axios#request-config), also override this library options |

## Methods

### GET

-   `.get(endpoint)`
-   `.get(endpoint, params)`

| Params     | Type     | Description                                                         |
| ---------- | -------- | ------------------------------------------------------------------- |
| `endpoint` | `String` | Aaro API endpoint, example: `Stok` or `Stok/StokMiktarListe`        |
| `params`   | `Object` | Query strings params, example: `{ sayfa: 2, SayfaSatirSayisi:100 }` |

### POST

-   `.post(endpoint, data)`
-   `.post(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | Aaro API endpoint, example: `Stok` or `Depo`                |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### PUT

-   `.put(endpoint, data)`
-   `.put(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | Aaro API endpoint, example: `StokVergi`                     |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### DELETE

-   `.delete(endpoint)`
-   `.delete(endpoint, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | Aaro API endpoint, example: `Stok` or `Depo`                |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
|            |

## Example of use

```js
const Aaro = require('aaro');

const aaro = new Aaro({
    baseUrl: 'https://erp2.aaro.com.tr',
    accessToken: 'OMBwgauc1HwRBx********',
});

aaro.get('Stok', {
    Sayfa: 1,
    SayfaSatirSayisi: 10,
    StokID: '1567,1562,8591,1531,7879,7875,6382,6384,6383,7879,6385',
}).then((response) => console.log(response.data.Model));
```

## Changelog

[See changelog for details](https://github.com/samilkahraman/aaro/blob/main/Changelog.md)
