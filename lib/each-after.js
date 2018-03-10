"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * A timing library for iterating through array's with an interval between each call
 * const myTimer = eachAfter()
 * const timerInstance = myTimer([2,4,9,16],1,onEachHandler,onCompleteHandler,false)
 * timerInstance.stop()
 * timerInstance.kill()
 * timerInstance.setInterval()
 */
var eachAfter = function eachAfter(timers) {
  // Must set both timers
  if (timers && (timers.set && !timers.clear || !timers.set && timers.clear)) {
    throw new Error("Both setTimer & clearTimer must be set, or neither");
  } // Set the correct timer


  var setTimer = timers && timers.set ? timers.set : function (secs, func) {
    return setTimeout(func, secs * 1000);
  };
  var clearTimer = timers && timers.clear ? timers.clear : function (timerId) {
    clearTimeout(timerId);
  };
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

  function loopWithDelay(elements, interval, onEach, onComplete) {
    var instant = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var timerId = null;
    var isUserStopped = false;
    var isCompleted = false;
    var array = Array.from(elements);
    var progressArray = [];
    /**
     * Move to the next element in tha array
     */

    function next() {
      // get next element
      var element = array.shift();

      if (!element) {
        if (onComplete && !isCompleted) {
          onComplete(progressArray, isUserStopped);
        }

        isCompleted = true;
        return;
      }

      loop(element);
    }
    /**
     * wrapper to make sure timerId is stored
     */


    function doAfter() {
      timerId = setTimer(interval, next);
    }
    /**
     * Sets the interval.
     *
     * @param  {number}  newInterval  The new interval
     */


    function setInterval(newInterval) {
      if (isCompleted) return;
      clearTimer(timerId);

      if (newInterval > 0) {
        interval = newInterval;
        doAfter();
      } else if (newInterval === 0) {
        interval = 0;
        next();
      }
    }
    /**
     * Stops the iteration by instantly completing the remaining elements
     */


    function stop() {
      if (isCompleted) return;
      isUserStopped = true;
      setInterval(0);
    }
    /**
     * Stops the iteration without completing the remaing array elements
     */


    function kill() {
      if (isCompleted) return;
      clearTimer(timerId);
    }
    /**
     * The delayed loop
     */


    function loop(element) {
      // append to progress
      progressArray.push(element); // fire the onEachHandler

      onEach(element, progressArray.length - 1, progressArray, interval, isUserStopped); // recurse with delay

      if (interval > 0) {
        doAfter();
      } // or immediate
      else {
          timerId = null;
          next();
        }
    } // get initial timer and kick things off


    if (instant) {
      next();
    } else {
      doAfter();
    } // return the timerObject


    return {
      setInterval: setInterval,
      stop: stop,
      kill: kill,
      interval: interval
    };
  }

  return loopWithDelay;
};

var _default = eachAfter;
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTRKZSxTIiwiZmlsZSI6ImVhY2gtYWZ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgdGltaW5nIGxpYnJhcnkgZm9yIGl0ZXJhdGluZyB0aHJvdWdoIGFycmF5J3Mgd2l0aCBhbiBpbnRlcnZhbCBiZXR3ZWVuIGVhY2ggY2FsbFxuICogY29uc3QgbXlUaW1lciA9IGVhY2hBZnRlcigpXG4gKiBjb25zdCB0aW1lckluc3RhbmNlID0gbXlUaW1lcihbMiw0LDksMTZdLDEsb25FYWNoSGFuZGxlcixvbkNvbXBsZXRlSGFuZGxlcixmYWxzZSlcbiAqIHRpbWVySW5zdGFuY2Uuc3RvcCgpXG4gKiB0aW1lckluc3RhbmNlLmtpbGwoKVxuICogdGltZXJJbnN0YW5jZS5zZXRJbnRlcnZhbCgpXG4gKi9cbmNvbnN0IGVhY2hBZnRlciA9ICh0aW1lcnMpID0+XG57XG4gICAgLy8gTXVzdCBzZXQgYm90aCB0aW1lcnNcbiAgICBpZiAodGltZXJzICYmICgodGltZXJzLnNldCAmJiAhdGltZXJzLmNsZWFyKSB8fCAoIXRpbWVycy5zZXQgJiYgdGltZXJzLmNsZWFyKSkpXG4gICAge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKFwiQm90aCBzZXRUaW1lciAmIGNsZWFyVGltZXIgbXVzdCBiZSBzZXQsIG9yIG5laXRoZXJcIikpO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgY29ycmVjdCB0aW1lclxuICAgIGNvbnN0IHNldFRpbWVyID0gKHRpbWVycyAmJiB0aW1lcnMuc2V0KVxuICAgICAgICA/IHRpbWVycy5zZXRcbiAgICAgICAgOiAoc2VjcywgZnVuYykgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuYywgc2VjcyoxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgY29uc3QgY2xlYXJUaW1lciA9ICh0aW1lcnMgJiYgdGltZXJzLmNsZWFyKVxuICAgICAgICA/IHRpbWVycy5jbGVhclxuICAgICAgICA6ICh0aW1lcklkKSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZClcbiAgICAgICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgYW4gYXJyYXkgd2l0aCBhIGdpdmVuIGludGVydmFsIGJldHdlZW4gZWFjaFxuICAgICAqXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgICBhcnJheSAgICAgICBUaGUgYXJyYXlcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9ICAgIGludGVydmFsICAgIFRoZSBpbnRlcnZhbCBpbiBzZWNvbmRzXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259ICBvbkVhY2ggICAgICBPbiBlYWNoIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIG9uQ29tcGxldGUgIE9uIGNvbXBsZXRlIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgIGluc3RhbnQgICAgIFNob3VsZCB0aGUgZmlyc3QgaXRlcmF0aW9uIGJlIGluc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgIFRoZSB0aW1lciBpbnN0YW5jZSBvYmplY3QsIGV4cG9zaW5nIHRoZSBzdG9wIGFuZCBraWxsIG1ldGhvZHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsb29wV2l0aERlbGF5KGVsZW1lbnRzLCBpbnRlcnZhbCwgb25FYWNoLCBvbkNvbXBsZXRlLCBpbnN0YW50PXRydWUpXG4gICAge1xuICAgICAgICBsZXQgdGltZXJJZCA9IG51bGw7XG4gICAgICAgIGxldCBpc1VzZXJTdG9wcGVkID0gZmFsc2U7XG4gICAgICAgIGxldCBpc0NvbXBsZXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5LmZyb20oZWxlbWVudHMpXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQXJyYXkgPSBbXTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IGVsZW1lbnQgaW4gdGhhIGFycmF5XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBuZXh0KClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gZ2V0IG5leHQgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5LnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAob25Db21wbGV0ZSAmJiAhaXNDb21wbGV0ZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlKHByb2dyZXNzQXJyYXksIGlzVXNlclN0b3BwZWQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlzQ29tcGxldGVkID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsb29wKGVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHdyYXBwZXIgdG8gbWFrZSBzdXJlIHRpbWVySWQgaXMgc3RvcmVkXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBkb0FmdGVyKClcbiAgICAgICAge1xuICAgICAgICAgICAgdGltZXJJZCA9IHNldFRpbWVyKGludGVydmFsLCBuZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBpbnRlcnZhbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICB7bnVtYmVyfSAgbmV3SW50ZXJ2YWwgIFRoZSBuZXcgaW50ZXJ2YWxcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHNldEludGVydmFsKG5ld0ludGVydmFsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNDb21wbGV0ZWQpIHJldHVyblxuXG4gICAgICAgICAgICBjbGVhclRpbWVyKHRpbWVySWQpXG5cbiAgICAgICAgICAgIGlmIChuZXdJbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxuICAgICAgICAgICAgICAgIGRvQWZ0ZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0ludGVydmFsID09PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGludGVydmFsID0gMFxuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3BzIHRoZSBpdGVyYXRpb24gYnkgaW5zdGFudGx5IGNvbXBsZXRpbmcgdGhlIHJlbWFpbmluZyBlbGVtZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc3RvcCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlZCkgcmV0dXJuXG4gICAgICAgICAgICBpc1VzZXJTdG9wcGVkID0gdHJ1ZVxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoMClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wcyB0aGUgaXRlcmF0aW9uIHdpdGhvdXQgY29tcGxldGluZyB0aGUgcmVtYWluZyBhcnJheSBlbGVtZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24ga2lsbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChpc0NvbXBsZXRlZCkgcmV0dXJuXG4gICAgICAgICAgICBjbGVhclRpbWVyKHRpbWVySWQpXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlbGF5ZWQgbG9vcFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbG9vcChlbGVtZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBhcHBlbmQgdG8gcHJvZ3Jlc3NcbiAgICAgICAgICAgIHByb2dyZXNzQXJyYXkucHVzaChlbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gZmlyZSB0aGUgb25FYWNoSGFuZGxlclxuICAgICAgICAgICAgb25FYWNoKGVsZW1lbnQsIHByb2dyZXNzQXJyYXkubGVuZ3RoIC0gMSwgcHJvZ3Jlc3NBcnJheSwgaW50ZXJ2YWwsIGlzVXNlclN0b3BwZWQpO1xuXG4gICAgICAgICAgICAvLyByZWN1cnNlIHdpdGggZGVsYXlcbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZG9BZnRlcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvciBpbW1lZGlhdGVcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aW1lcklkID0gbnVsbFxuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGluaXRpYWwgdGltZXIgYW5kIGtpY2sgdGhpbmdzIG9mZlxuICAgICAgICBpZiAoaW5zdGFudClcbiAgICAgICAge1xuICAgICAgICAgICAgbmV4dCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBkb0FmdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyByZXR1cm4gdGhlIHRpbWVyT2JqZWN0XG4gICAgICAgIHJldHVybiB7IHNldEludGVydmFsLCBzdG9wLCBraWxsLCBpbnRlcnZhbCB9O1xuICAgIH1cblxuICAgIHJldHVybiBsb29wV2l0aERlbGF5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVhY2hBZnRlclxuIl19