# blue-tape

Tape with promise support.

### usage

Same as tape, except if you return a promise from a test,
it will be checked for errors. If there are no errors, the test
will end. Otherwise the test will fail. This means there is no
need to use `t.plan()` or `t.end()`

### example

assuming `delay()` returns a promise


```js
test("simple delay", function(t) {
    return delay(1);
});

test("should fail", function(t) {
    return delay(1).then(function() {
        throw new Error("Failed!");
    });
});
```

### Generators

If you're using a version of NodeJS that supports generator functions, you
can test generators by passing a generator function as the tape
callback function.

```js
test("simple generator", function*(t) { // <-- Note the function* callback
  var asyncResult = yield yieldableFunction();
  t.ok(asyncResult.status, "Yield resolved to a status object");
})
```

### license

MIT
