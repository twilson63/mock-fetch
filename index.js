if (!fetch) {
  throw new Error('fetch is not found! "npm install isomorphic-fetch"')
}

const doFetch = fetch

module.exports = Object.freeze({
  mockFetch,
  unMockFetch
})

let tests = []

/**
 * mockFetch
 *
 * create a wrapper around fetch to capture the initial request
 * and if it matches the criteria, return the response versus
 * proceeding with the fetch request
 *
 * @param {string} testUrl - the absolute url to match on
 * @param {string} testMethod - the http method to match on
 * @param {Object} response - the mock response Object
 *
 */
function mockFetch(testUrl='', testMethod='GET', response={statusCode: 200, body: {ok: true}}) {
  const matches = isMatch(testUrl, testMethod)
  tests = append({test: matches, response}, tests)

  fetch = (url, opts={method: 'GET'}) => {
    const match = tests.reduce((acc, t) => {
      if (t.test(url, opts.method)) {
        return t.response
      }
      return acc
    }, null, tests)

    if(match) {
      return Promise.resolve({
        status: match.status,
        json: () => match.body
      })
    }
    return doFetch(url, opts)
  }
}

/**
 * unMockFetch 
 *
 * unwraps the fetch module
 *
 */
function unMockFetch() {
  tests = []
  fetch = doFetch
}

// pure functions
//
function isMatch(a1, b1) {
  return function(a2, b2) {
    return and(expMatch(a1,a2), equals(b1,b2))
  }
}

function append(value, array) {
  return [...array, value]
}

function expMatch(a,b) {
  return new RegExp(a).test(b)
}

function and (a,b) {
  return a && b
}

function equals(a,b) {
  return a === b
}
