if (!fetch) {
  throw new Error('fetch is not found! "npm install isomorphic-fetch"')
}

const doFetch = fetch

module.exports = Object.freeze({
  mockFetch,
  unMockFetch
})

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
  fetch = (url, opts={method: 'GET'}) => {
    if(matches(url, opts.method)) {
      return Promise.resolve({
        statusCode: response.statusCode,
        json: () => response.body
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
  fetch = doFetch
}

// pure functions
//
function isMatch(a1, b1) {
  return function(a2, b2) {
    return and(equals(a1,a2), equals(b1,b2))
  }
}

function and (a,b) {
  return a && b
}

function equals(a,b) {
  return a === b
}
