var Test = require('tape/lib/test');

function isPromise(p) {
    return p && p.then && p.then instanceof Function;
}


Test.prototype.run = function () {
    if (this._skip) 
        return this.end();
    this.emit('prerun');
    try {
        var p = this._cb(this);
        var self = this;
        if (!this.ended && isPromise(p))
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
