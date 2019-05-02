# mock-fetch

mock out fetch requests and provide a defined response for integration testing.

## Example

```js
require('isomorphic-fetch')
const test = require('tape')
const { mockFetch, unMockFetch } = require('../')

test('mockFetch success', t => {
  mockFetch('http://localhost:5984/', 'GET', { statusCode: 200, body: {ok: true}})

  fetch('http://localhost:5984/').then(res => {
    t.equal(res.statusCode, 200)
    return res.json()
  })
    .then(doc => t.deepEquals(doc, {ok: true}))

  unMockFetch()
  t.end()
})
```

## Install

``` sh
npm install --save-dev @twilson63/mock-fetch
```

## License

MIT

## Contributions

pull-requests are welcome.

