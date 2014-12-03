# settler

Settle a number towards another number over time with an overridable tween.

## Usage

    npm install settler

```javascript

var Settler = require('settler');

var settler = new Settler();

settler.on('frame', function(value){
    console.log(value);
});

settler.on('settle', function(){
    console.log('done');
});

settler.settle(100);

// Will log a few times from 100 to 0.

```

You can cancel a settle with ```.cancel()``` and listen for the event:


```javascript

settler.on('cancel', function(value){
    console.log('cancled');
});

settler.cancel();

```

You can override any defaults on the instance via the constructor or just manually:


```javascript

var Settler = require('settler');

var settler = new Settler({
    target: 50,
    tween: function(value, distance){
        return distance / 10; // get one tenth closer to the target each 'frame'
    }
});

// later...

settler.target = 300;

```

And more, read the source for more interesting usage.