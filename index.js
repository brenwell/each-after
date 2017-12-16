/**
 * A timing library for iterating through array's with an interval between each call
 * const myTimer = eachAfter()
 * const timerInstance = myTimer([2,4,9,16],1,onEachHandler,onCompleteHandler,false)
 * timerInstance.stop()
 * timerInstance.kill()
 * timerInstance.setInterval()
 */
const eachAfter = (setTimerFunc,clearTimerFunc) =>
{
    // set the set timer function
    let makeTimer

    // use the given func
    if (setTimerFunc)
    {
        makeTimer = setTimerFunc
    }

    // fallback to setTimeout
    else
    {
        makeTimer = (fn,interv) =>
        {
            return setTimeout(fn, interv*1000);
        }
    }

    // set the clear timer function
    let clearTimer

    // use the given func
    if (clearTimerFunc)
    {
        clearTimer = clearTimerFunc
    }

    // fallback to clearTimeout
    else
    {
        clearTimer = (timerId) =>
        {
            return clearTimeout(timerId)
        }
    }

    /**
     * Iterates an array with a given interval between each
     *
     * @param  {array}     array       The array
     * @param  {number}    interval    The interval in seconds
     * @param  {Function}  onEach      On each handler
     * @param  {Function}  onComplete  On complete handler
     * @param  {boolean}   instant     Should the first iteration be instant
     * @return {Object}    The timer instance object, exposing the stop and kill methods
     */
    function loopWithDelay(elements, interval, onEach, onComplete, instant=true)
    {
        let timerId = null;
        const array = Array.from(elements)
        const progressArray = [];

        /**
         * Move to the next element in tha array
         */
        function next()
        {
            if (!array.length)
            {
                if (onComplete) onComplete(progressArray);
                return
            }

            timerId =  loop();
        }

        /**
         * Sets the interval.
         *
         * @param  {number}  newInterval  The new interval
         */
        function setInterval(newInterval)
        {
            kill()

            if (newInterval > 0)
            {
                interval = newInterval
                timerId = makeTimer(next, interval);
            }
            else if (newInterval === 0)
            {
                interval = 0
                next()
            }
        }

        /**
         * Stops the iteration by instantly completing the remaining elements
         */
        function stop()
        {
            setInterval(0)
        }

        /**
         * Stops the iteration without completing the remaing array elements
         */
        function kill()
        {
            clearTimer(timerId)
        }

        /**
         * The delayed loop
         */
        function loop()
        {
            // get next element
            const element = array.shift();

            // append to progress
            progressArray.push(element);

            // fire the onEachHandler
            onEach(element, progressArray.length - 1, progressArray, interval);

            // recurse with delay
            if (interval > 0)
            {
                return makeTimer(next, interval);
            }

            // or immediate
            return next()
        }

        // get initial timer and kick things off
        timerId =  (instant) ? loop() : makeTimer(loop, interval);

        // return the timerObject
        return { setInterval, stop, kill, interval };
    }

    return loopWithDelay
}

export default eachAfter
