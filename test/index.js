require('isomorphic-fetch')
const test = require('tape')
const { mockFetch, unMockFetch } = require('../')

test('mockFetch success', t => {
  mockFetch('http://localhost:5984/', 'GET', { status: 200, body: {ok: true}})

  fetch('http://localhost:5984/').then(res => {
    t.equal(res.status, 200)
    return res.json()
  })
    .then(doc => t.deepEquals(doc, {ok: true}))

  unMockFetch()
  t.end()
})
