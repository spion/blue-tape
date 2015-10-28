var test = require('../tape-dispenser');

test("basic generator test", function*(t) {
    var p = new Promise(function(resolve) {
        setTimeout(function() {
            return resolve(42);
        });
    });
    var meaningOfLife = yield p;
    t.equal(meaningOfLife, 42, 'Promise resolved via yield');
});
