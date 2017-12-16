# each-after

A timing library for iterating through array's with an interval between each. It was intended for using with games when you need stepped animations for multiple elements. E.g. animating a grid of elements to create a visual pattern. It also offers the ability to immediately **stop** or **kill** a current iteration.

## Install

```shell
npm install each-after
```

## Usage

**each-after** support common.js and es6-modules

```js
// common.js
const eachAfter = require('each-after')()

// es6
import eachAfterTimer from 'each-after'
const eachAfter = eachAfterTimer()

```


### Simple example

Below is the most basic usage

```js
const timerInstance = eachAfter(
    [2,4,9,16],     // an array to iterate over
    1,              // seconds between each iteration
    onEach          // function to call on each iteration
)
```

### On completion

Optionally you can pass a function as the 4th parameter for handling the completion of the loop

```js
const timerInstance = eachAfter(
    [2,4,9,16],
    1,
    onEach
    onComplete      // (Optional) function to call at the end of the iteration
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
    false,          // (Optional) default = true
)
```

## Methods

Additional methods for manipulating the timer during iteration.

### SetInterval

The interval can be changed at any time during iteration. Calling `timerInstance.setInterval(0)` with value of 0 will cause the iterations to happen in the same stack via a standard loop

```js
const timerInstance = eachAfter([2,4,9,16],1,onEach)

timerInstance.setInterval(10) // seconds
```

### Stop

Iteration can be stopped by calling `stop` and it will trigger all the iterations immediately, including the completionHandler, avoiding using the timer function. This method is essentially the same as `timerInstance.setInterval(0)`.

```js
const timerInstance = eachAfter([2,4,9,16],1,onEach)

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
    setTimer: (func, seconds) => { /*... your set timeout function */ },
    clearTimer: (timerId) => { /*... your clear timeout function */ },
})

```
