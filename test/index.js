var test = require('tape'),
    Settler = require('../');

test('settler settles', function(t){
    t.plan(1);

    var settler = new Settler();

    settler.on('settle', function(){
        t.pass();
    });

    settler.settle(100);
});

test('settler settles to custom target', function(t){
    t.plan(1);

    var settler = new Settler({
        target: 50
    });

    settler.on('settle', function(){
        t.equal(this.value, 50);
    });

    settler.settle(100);
});

test('settle up', function(t){
    t.plan(1);

    var settler = new Settler({
        target: 100
    });

    settler.on('settle', function(){
        t.equal(this.value, 100);
    });

    settler.settle(0);
});

test('override tween function', function(t){
    t.plan(4);

    var settler = new Settler();

    settler.tween = function(distance){
        return distance * 0.85;
    }

    // Should get called 4 times
    settler.on('frame', function(value){
        t.pass();
    });

    settler.settle(100);
});

test('cancel settle', function(t){
    t.plan(1);

    var settler = new Settler();

    // Should NOT get called
    settler.on('settle', function(){
        t.fail('settle event fired');
    });

    // Should get called once
    settler.on('cancel', function(){
        t.pass('cancel event emitted');
    });

    settler.settle(100);
    settler.cancel();
});