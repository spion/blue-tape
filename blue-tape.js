var Test = require('tape/lib/test');

function checkPromise(p) {
    return p && typeof p.then === 'function';
}

function checkGenerator(g) {
    return g && typeof g.next === 'function' && typof g.throw === 'function';
}


Test.prototype.run = function () {
    if (this._skip)
        return this.end();
    this.emit('prerun');
    try {
        var p = this._cb && this._cb(this),
            isPromise = checkPromise(p),
            isGenerator = checkGenerator(p);
        var self = this;

        // If this._cb was a generator, convert it to a promise
        if (isGenerator) {
            p = co(p);
            isPromise = true;
        }
        if (isPromise)
            p.then(function() {
                self.end();
            }, function(err) {
                self.error(err);
                self.end();
            });

    }
    catch (err) {
        this.error(err);
        this.end();
        return;
    }
    this.emit('run');
};

module.exports = require('tape');
