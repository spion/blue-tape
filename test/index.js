var tape = require('../blue-tape')
var bl = require('bl')
var P = require('bluebird')
P.longStackTraces()

function test (name, test, checkErrors) {
  tape.test(name, function (t) {
    var htest = tape.createHarness()
    htest.createStream().pipe(bl(function (_, data) {
      checkErrors && checkErrors(data.toString().split('\n'), t)
    }))
    htest(function (t) {
      return test(t, htest)
    })
  })
}

function verifyAsserts (counts) {
  return function (lines, t) {
    t.equal(count(lines, /^ok/), counts.ok, 'should have ' + counts.ok + ' ok asserts')
    t.equal(count(lines, /^not ok/), counts.fail, 'should have ' + counts.fail + ' failed asserts')
    t.end()
  }
}

function count (lines, regex) {
  var c = 0
  for (var k = 0; k < lines.length; ++k) {
    if (regex.test(lines[k])) {
      ++c
    }
  }
  return c
}

test('non-promise test', function (t) {
  t.ok(true)
  t.end()
},
  verifyAsserts({ok: 1, fail: 0}))

test('simple delay', function (t) {
  return P.delay(1)
},
  verifyAsserts({ok: 0, fail: 0}))

test('should not affect plan', function (t) {
  t.plan(2)
  t.ok(true)
  t.ok(true)
  return P.delay(1)
},
  verifyAsserts({ok: 2, fail: 0}))

test('nested tests with promises', function (t) {
  t.test('delay1', function (t) {
    return P.delay(1)
  })
  t.test('delay2', function () {
    return P.delay(1)
  })
},
  verifyAsserts({ok: 0, fail: 0}))

test('should error', function (t) {
  return P.delay(1).then(function () {
    throw new Error('Failed!')
  })
},
  verifyAsserts({ok: 0, fail: 1}))

test('should fail', function (t) {
  return P.delay(1).then(function () {
    return P.reject()
  })
},
  verifyAsserts({ok: 0, fail: 1}))

test('run test with only', function (t, htest) {
  var count = 0
  htest('first', function (t) {
    t.equal(++count, 1)
    t.end()
  })
  htest.only('second', function (t) {
    t.equal(++count, 1)
    t.end()
  })
  t.end()
},
  verifyAsserts({ok: 1, fail: 0}))

test('test that expects promise to fail', function (t) {
  return t.shouldFail(P.delay(1).then(function () {
    return P.reject(new Error("Test"))
  }))
},
  verifyAsserts({ok: 1, fail: 0}))

test('test that expects promise to fail, but it succeeds', function (t) {
  return t.shouldFail(P.delay(1).then(function () {
    return P.resolve()
  }))
},
  verifyAsserts({ok: 0, fail: 1}))

test('test that expects specific exception', function (t) {
  return t.shouldFail(P.delay(1).then(function () {
    var f = 5
    f.toFixed(100) // RangeError
  }), RangeError)
},
  verifyAsserts({ok: 1, fail: 0}))

test('test that expects wrong exception', function (t) {
  return t.shouldFail(P.delay(1).then(function () {
    var f = 5
    f.toFixed(100) // RangeError
  }), SyntaxError)
},
  verifyAsserts({ok: 0, fail: 1}))
