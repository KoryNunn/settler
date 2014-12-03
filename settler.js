var EventEmitter = require('events').EventEmitter;

function Settler(settings){
    if(settings && typeof settings === 'object'){
        for(var key in settings){
            this[key] = settings[key];
        }
    }
}
Settler.prototype = Object.create(EventEmitter.prototype);
Settler.prototype.constructor = Settler;
Settler.prototype.rate = null;
Settler.prototype.threshold = 0.1;
Settler.prototype.target = 0;

Settler.prototype._step = function(){
    var distance = this.tween(this.value - this.target);
    this.value -= distance;
    this.rate = distance;
};

Settler.prototype._complete = function(){
    this.value = this.target;
    this.rate = null;
};

Settler.prototype.settle = function(value){
    var settler = this;

    this.value = value;

    if(this._settleFrameId){
        this.cancel();
    }

    function frame(){
        if(settler.complete()){
            settler._complete();
            settler.emit('settle');
            return;
        }

        settler._settleFrameId = settler.nextFrame(function(){
            settler.emit('frame', settler.value);
            settler._step();
            frame();
        });
    }

    frame();

    return settler;
};

Settler.prototype.complete = function(){
    return Math.abs(this.value - this.target) < this.threshold;
};

Settler.prototype.tween = function(distance){
    return distance / 10;
};

Settler.prototype.cancel = function(){
    this.emit('cancel');
    this.cancelFrame(this._settleFrameId);
    this._complete();
};

Settler.prototype.cancelFrame = typeof requestAnimationFrame !== 'undefined' ? function(id){
    return cancelAnimationFrame(id);
} :
function(id){
    return clearTimeout(id);
};

Settler.prototype.nextFrame = typeof requestAnimationFrame !== 'undefined' ? function(callback){
    return requestAnimationFrame(callback);
} : 
function(callback){
    return setTimeout(callback,17);
};

module.exports = Settler;