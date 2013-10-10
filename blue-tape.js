var Test = require('tape/lib/test');

Test.prototype.run = function () {
    if (this._skip) 
        return this.end();
    this.emit('prerun');
    try {
        var promise = this._cb(this);
        var self = this;
        if (!this.ended 
            && promise.then 
        && promise.then instanceof Function) 
            promise.then(function() {
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
