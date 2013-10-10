# blue-tape

Tape with promise support.

### usage

Same as tape, except if you return a promise from a test,
it will be checked for errors. If there are no errors, the test
will end. Otherwise the error will be shown.

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

### license

MIT
