# mock-fetch

mock out fetch requests and provide a defined response for integration testing.

## Example

```js
import { test } from 'tape-modern'
import { mfetch, clear } from './'

const url = 'https://jsonplaceholder.typicode.com/todos'

test('post mfetch', async t => {
  mfetch.post(url, { status: 201, body: {ok: true}})

  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({"name": "foo"}),
    headers: {
      'content-type': 'application/json'
    }
  }).then(res => res.json())

  t.ok(result.ok)

  clear()
})

```

## Install

``` sh
npm install --save-dev @twilson63/mock-fetch
```

## API

* mfetch(url, method, resposne)
* mfetch.post(url, response)
* mfetch.put(url, response)
* mfetch.delete(url, response) - watches for delete fetches that matches the url
* clear() - clears mocks

* response object contains a status and body property

``` 
{
  status: 200,
  body: { ok: true }
}
```

## License

MIT

## Contributions

pull-requests are welcome.


