# blue-tape

Tape with promise support.

### Usage

Same as [tape](https://github.com/substack/tape), except if you return a promise from a test,
it will be checked for errors. If there are no errors, the test will end. Otherwise the test
will fail. This means there is no need to use `t.plan()` or `t.end()`.

Also provides `t.shouldFail(promise P, optional class|regex expected, optional message)` (as
well as the alias `shouldReject`) which returns a new promise that resolves successfully if `P`
rejects. If you provide the optional class, or regex then it additionally ensures that `err` is
an instance of that class or that the message matches the regular expression. The behaviour is
identical to tape's `throws` assertion.

### Examples

Assuming `delay()` returns a promise:

```js
const test = require('blue-tape');

test("simple delay", function(t) {
    return delay(1);
});

test("should fail", function(t) {
    return delay(1).then(function() {
        throw new Error("Failed!");
    });
});
```

Assuming `failDelay()` returns a promise that rejects with a DerpError:

```js
test("promise fails but test succeeds", function(t) {
    return t.shouldFail(failDelay(), DerpError);
});
```

### License

MIT
