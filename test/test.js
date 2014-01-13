var test = require('grape'),
    Settler = require('../');

test('settler settles', function(t){
    t.timeout(5000);
    t.plan(1);

    var settler = new Settler();

    settler.on('settle', function(){
        t.pass();
    });

    settler.settle(100);
});

test('override tween function', function(t){
    t.timeout(5000);
    t.plan(4);

    var settler = new Settler();

    settler.tween = function(value){
        return value *= 0.1;
    }

    // Should get called 4 times
    settler.on('frame', function(value){
        t.pass();
    });

    settler.settle(100);
});

test('cancel settle', function(t){
    t.timeout(5000);
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

if(typeof window !== 'undefined' && typeof window.requestAnimationFrame !== 'undefined'){
    test('requestAnimationFrame', function(t){
    t.timeout(5000);
        t.plan(1);

        var settler = new Settler();
        settler.nextFrame = requestAnimationFrame.bind(window);
        settler.cancelFrame = cancelAnimationFrame.bind(window);

        settler.on('settle', function(){
            t.pass();
        });

        settler.settle(100);
    });
}