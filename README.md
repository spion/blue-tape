# blue-tape

Tape with promise support.

### usage

Same as tape, except if you return a promise from a test,
it will be checked for errors. If there are no errors, the test
will end. Otherwise the test will fail. This means there is no
need to use `t.plan()` or `t.end()`

Also provides `t.shouldFail(promise P, optional class C)` which returns
a new promise that resolves successfully iff `P` rejects. If you provide 
the optional class, then it additiionally ensures that `err` is an
instance of that class.

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

assuming `failDelay()` returns a promise that rejects with a DerpError

```js
test("promise fails but test succeeds", function(t) {
    return t.shouldFail(failDelay(), DerpError)
});
```

### license

MIT
