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

test('get with defaults', async t => {
  mfetch('https://jsonplaceholder.typicode.com/todos/1')

  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => res.json())

  t.ok(result.ok)

  clear()
})


