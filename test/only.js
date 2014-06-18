
var test = require('../blue-tape').test
var P = require('bluebird');
P.longStackTraces();

test("only", function(t){
    var count = 0;
    test('first', function(t){
        t.equal( ++count, 1);
        t.end();
    });
    test.only('second', function(t){
        t.equal( ++count, 1);
        t.end();
    });
    t.end();
});
