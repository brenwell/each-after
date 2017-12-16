# each-after

A timing library for iterating through array's with an interval between each. It was intended for using with games when you need stepped animations for multiple elements. E.g. animating a grid of elements to create a visual pattern. It also offers the ability to immediately **stop** or **kill** a current iteration.

## Install

```shell
npm install each-after
```

## Usage

### Simple example

Below is the basic usage

```js
const eachAfter = require('eachAfter')
const myTimer = eachAfter()
const timerInstance = myTimer(
    [2,4,9,16],     // an array to iterate over
    1,              // seconds between each iteration
    onEach          // function to call on each iteration
)
```

### On completion

```js
const timerInstance = myTimer(
    [2,4,9,16],
    1,
    onEach
    onComplete      // function to call at the end of the iteration
)
```

### Prevent instantly firing first iteration

```js
const timerInstance = myTimer(
    [2,4,9,16],
    1,
    onEach
    onComplete
    false,          // (Optional) default = true
)
```

### SetInterval

The interval can be changed at any time during iteration. Calling `timerInstance.setInterval(0)` with value of 0 will cause the iterations to happen in the same stack via a standard loop

```js
const timerInstance = myTimer([2,4,9,16],1,onEach)

timerInstance.setInterval(10) // seconds
```

### Stop

Iteration can be stopped by calling `stop` and it will trigger all the iterations immediately, including the completionHandler, avoiding using the timer function. This method is essentially the same as `timerInstance.setInterval(0)`.

```js
const timerInstance = myTimer([2,4,9,16],1,onEach)

timerInstance.stop()
```

### Kill

Iteration can be completely killed, which will prevent any remaing handlers, including the completionHandler, from being fired

```js
const timerInstance = myTimer([2,4,9,16],1,onEach)

timerInstance.kill()
```


