var Test = require('tape/lib/test');

function checkPromise(p) {
    return p && p.then && typeof p.then === 'function';
}


Test.prototype.run = function () {
    if (this._skip)
        return this.end();
    this.emit('prerun');
    try {
        var p = this._cb && this._cb(this),
            isPromise = checkPromise(p)
        var self = this;
        if (isPromise)
            p.then(function() {
                self.end();
            }, function(err) {
                err ? self.error(err) : self.fail(err);
                self.end();
            })

    }
    catch (err) {
        err ? this.error(err) : this.fail(err);
        this.end();
        return;
    }
    this.emit('run');
};

module.exports = require('tape');
