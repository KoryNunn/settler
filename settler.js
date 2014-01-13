var EventEmitter = require('events').EventEmitter;

function Settler(){}
Settler.prototype = Object.create(EventEmitter.prototype);
Settler.prototype.constructor = Settler;
Settler.prototype.minValue = 0.1;
Settler.prototype.settle = function(value){
    var settler = this;

    this.value = value;

    if(this._settleFrameId){
        this.cancel();
    }

    function frame(){
        if(settler.value<settler.minValue){
            settler.emit('settle');
            return;
        }

        settler._settleFrameId = settler.nextFrame(function(){
            settler.emit('frame', settler.value);
            settler.value = settler.tween(settler.value);
            frame();
        });
    }

    frame();

    return settler;
};
Settler.prototype.tween = function(value){
    return value *= 0.9;
};
Settler.prototype.cancel = function(){
    this.emit('cancel');
    this.cancelFrame(this._settleFrameId);
};
Settler.prototype.cancelFrame = function(id){
    return clearTimeout(id);
};
Settler.prototype.nextFrame = function(callback){
    return setTimeout(callback,17);
};

module.exports = Settler;