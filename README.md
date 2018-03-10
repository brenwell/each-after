# each-after

Process **each** element **after** n seconds

A library for **looping** through an array with a **delay** between each iteration. It was intended for usage with animations, for situations when multiple elements need to have their behaviour stepped. E.g. animating a grid of elements to create a visual pattern. It also offers the ability to immediately **stop** or **kill** a current iteration.

Works great with [pixi-timeout](https://github.com/brenwell/pixi-timeout)

## Install

```shell
npm install each-after
```

## Usage

**each-after** supports common.js and es6-modules

**common.js**

```js
const eachAfter = require('each-after')()
```

**es6 modules**

```js
import eachAfterTimer from 'each-after'
const eachAfter = eachAfterTimer()
```

### Simple example

Below is the most basic usage

```js
const timerInstance = eachAfter(
    [2,4,9,16],     // an array to iterate over
    1,              // seconds between each iteration
    function(){}    // function to call on each iteration
)
```

### On each

You must pass a function as the 3rd parameter for handling the each iteration of the loop

* **element** - The current element being processed in the array.
* **index** - The index of the current element being processed in the array
* **processed** - The array of all the elements processed so far
* **interval** - The time in seconds since the last element was processed
* **wasStopped** - Whether the iteration was stoppped manually via `.stop()`

```js
const onEach = (element, index, processed, interval, wasStopped) = {
    console.log(element, index, processed, interval, wasStopped)

    // Would fire 4 times with the following results
    // 2, 0, [2], 1, false
    // 4, 1, [2,4], 1, false
    // 9, 2, [2,4,9], 1, false
    // 16, 3, [2,4,9,16], 1, false
}

const timerInstance = eachAfter(
    [2,4,9,16],
    1,
    onEach
)
```

### On completion

Optionally you can pass a function as the 4th parameter for handling the completion of the loop

```js
const onComplete = (finalArray, wasStopped) = {
    console.log(finalArray) // [2,4,9,16]
    console.log(wasStopped) // whether the timer was stopped via the `.stop()` method
}

const timerInstance = eachAfter(
    [2,4,9,16],
    1,
    onEach
    onComplete // (Optional) function to call at the end of the iteration
)
```

### Prevent instantly firing first iteration

By default the first iteration is called immediately and then the remaining iterations are delayed, to prevent this behaviour you can pass `false` as the 5th parameter

```js
const timerInstance = eachAfter(
    [2,4,9,16],
    1,
    onEach
    onComplete
    false,   // (Optional) default = true
)
```

## Methods

Additional methods for manipulating the timer during iteration.

### Set interval

The interval can be changed at any time during iteration. Calling `timerInstance.setInterval(0)` with value of 0 will cause the iterations to happen in the same stack via a standard loop

```js
const timerInstance = eachAfter([2,4,9,16],1,onEach)

timerInstance.setInterval(10) // seconds
```

### Stop

Iteration can be stopped by calling `stop` and it will trigger all the iterations immediately, including the completionHandler, avoiding using the timer function. This method is essentially the same as `timerInstance.setInterval(0)`. The state of the iteration can be checked via the `onEach` and `onComplete` handlers by checking the `wasStopped` parameter. Stop can only be called before the iteration is completed to prevent multiple onComplete events.

```js
const timerInstance = eachAfter(
    [2,4,9,16],
    1,
    onEach: (ele, idx, pro, int, wasStopped) => { }, // wasStopped will be true
    onComplete: (arr, wasStopped) => { } // wasStopped will be true
)

timerInstance.stop()
```

### Kill

Iteration can be completely killed, which will prevent any remaing handlers, including the completionHandler, from being fired

```js
const timerInstance = eachAfter([2,4,9,16],1,onEach)

timerInstance.kill()
```

## Alternate timeout methods

By default **each-after** uses `setTimeout` and `clearTimeout` to perform the delays. If you would prefer to use your own methds you can pass them on creation.

```js
import eachAfterTimer from 'each-after'

const eachAfter = eachAfterTimer({
    set: (seconds, func) => { /*... your set timeout function */ },
    clear: (timerId) => { /*... your clear timeout function */ },
})

```

### Pixi-Timeout
Here is an example of using custom timeout methods. It uses [pixi-timeout](https://github.com/brenwell/pixi-timeout) `requestAnimationFrame` based timing functions, which additionally allow for pausing & resuming the timers via the `PIXI.Application.stop` and `PIXI.Application.start` methods

```js
import pix from ‘pixi,js’
import pixiTimeout from 'pixi-timeout'
import EachAfterCreate from 'each-after'
window.eachAfter = EachAfterCreate({
    set:PIXI.setTimeout,
    clear:PIXI.clearTimeout
})
```