/**
 * A timing library for iterating through array's with an interval between each call
 * const myTimer = eachAfter()
 * const timerInstance = myTimer([2,4,9,16],1,onEachHandler,onCompleteHandler,false)
 * timerInstance.stop()
 * timerInstance.kill()
 * timerInstance.setInterval()
 */
const eachAfter = (timers) =>
{
    // Must set both timers
    if (timers && ((timers.set && !timers.clear) || (!timers.set && timers.clear)))
    {
        throw (new Error("Both setTimer & clearTimer must be set, or neither"));
    }

    // Set the correct timer
    const setTimer = (timers && timers.set)
        ? timers.set
        : (secs, func) =>
            setTimeout(func, secs*1000);

    const clearTimer = (timers && timers.clear)
        ? timers.clear
        : (timerId) =>
            clearTimeout(timerId);

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
        let isUserStopped = false;
        let isCompleted = false;
        const array = Array.from(elements)
        const progressArray = [];


        /**
         * Move to the next element in tha array
         */
        function next()
        {
            if (!array.length)
            {
                if (onComplete) onComplete(progressArray, isUserStopped);
                isCompleted = true
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
                timerId = setTimer(interval, next);
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
            if (isCompleted) return
            isUserStopped = true
            setInterval(0)
        }

        /**
         * Stops the iteration without completing the remaing array elements
         */
        function kill()
        {
            if (isCompleted) return
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
            onEach(element, progressArray.length - 1, progressArray, interval, isUserStopped);

            // recurse with delay
            if (interval > 0)
            {
                return setTimer(interval, next);
            }

            // or immediate
            return next()
        }

        // get initial timer and kick things off
        timerId =  (instant) ? loop() : setTimer(interval, loop);

        // return the timerObject
        return { setInterval, stop, kill, interval };
    }

    return loopWithDelay
}

export default eachAfter
