var Test = require('tape/lib/test');

function checkPromise(p) {
    return p && p.then && p.then instanceof Function;
}


var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

Test.prototype.run = function () {
    if (this._skip) 
        return this.end();
    this.emit('prerun');
    try {
        var p = this._cb && this._cb(this),
            isPromise = checkPromise(p)
        var self = this;
        if (checkPromise(p))
            p.then(function() {
                self.end();
            }, function(err) {
                self.error(err);
                self.end();
            })        

    }
    catch (err) {
        this.error(err);
        this.end();
        return;
    }
    this.emit('run');
};

module.exports = require('tape');
