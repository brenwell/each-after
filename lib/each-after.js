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
    return clearTimeout(timerId);
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
    var isUserStopped = false; // user has isUserStopped it

    var isCompleted = false;
    var array = Array.from(elements);
    var progressArray = [];
    /**
     * Move to the next element in tha array
     */

    function next() {
      if (!array.length) {
        if (onComplete) onComplete(progressArray, isUserStopped);
        isCompleted = true;
        return;
      }

      timerId = loop();
    }
    /**
     * Sets the interval.
     *
     * @param  {number}  newInterval  The new interval
     */


    function setInterval(newInterval) {
      kill();

      if (newInterval > 0) {
        interval = newInterval;
        timerId = setTimer(interval, next);
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


    function loop() {
      // get next element
      var element = array.shift(); // append to progress

      progressArray.push(element); // fire the onEachHandler

      onEach(element, progressArray.length - 1, progressArray, interval, isUserStopped); // recurse with delay

      if (interval > 0) {
        return setTimer(interval, next);
      } // or immediate


      return next();
    } // get initial timer and kick things off


    timerId = instant ? loop() : setTimer(interval, loop); // return the timerObject

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSB0aW1pbmcgbGlicmFyeSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggYXJyYXkncyB3aXRoIGFuIGludGVydmFsIGJldHdlZW4gZWFjaCBjYWxsXG4gKiBjb25zdCBteVRpbWVyID0gZWFjaEFmdGVyKClcbiAqIGNvbnN0IHRpbWVySW5zdGFuY2UgPSBteVRpbWVyKFsyLDQsOSwxNl0sMSxvbkVhY2hIYW5kbGVyLG9uQ29tcGxldGVIYW5kbGVyLGZhbHNlKVxuICogdGltZXJJbnN0YW5jZS5zdG9wKClcbiAqIHRpbWVySW5zdGFuY2Uua2lsbCgpXG4gKiB0aW1lckluc3RhbmNlLnNldEludGVydmFsKClcbiAqL1xuY29uc3QgZWFjaEFmdGVyID0gKHRpbWVycykgPT5cbntcbiAgICAvLyBNdXN0IHNldCBib3RoIHRpbWVyc1xuICAgIGlmICh0aW1lcnMgJiYgKCh0aW1lcnMuc2V0ICYmICF0aW1lcnMuY2xlYXIpIHx8ICghdGltZXJzLnNldCAmJiB0aW1lcnMuY2xlYXIpKSlcbiAgICB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoXCJCb3RoIHNldFRpbWVyICYgY2xlYXJUaW1lciBtdXN0IGJlIHNldCwgb3IgbmVpdGhlclwiKSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBjb3JyZWN0IHRpbWVyXG4gICAgY29uc3Qgc2V0VGltZXIgPSAodGltZXJzICYmIHRpbWVycy5zZXQpXG4gICAgICAgID8gdGltZXJzLnNldFxuICAgICAgICA6IChzZWNzLCBmdW5jKSA9PlxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jLCBzZWNzKjEwMDApO1xuXG4gICAgY29uc3QgY2xlYXJUaW1lciA9ICh0aW1lcnMgJiYgdGltZXJzLmNsZWFyKVxuICAgICAgICA/IHRpbWVycy5jbGVhclxuICAgICAgICA6ICh0aW1lcklkKSA9PlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgYW4gYXJyYXkgd2l0aCBhIGdpdmVuIGludGVydmFsIGJldHdlZW4gZWFjaFxuICAgICAqXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgICBhcnJheSAgICAgICBUaGUgYXJyYXlcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9ICAgIGludGVydmFsICAgIFRoZSBpbnRlcnZhbCBpbiBzZWNvbmRzXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259ICBvbkVhY2ggICAgICBPbiBlYWNoIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIG9uQ29tcGxldGUgIE9uIGNvbXBsZXRlIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgIGluc3RhbnQgICAgIFNob3VsZCB0aGUgZmlyc3QgaXRlcmF0aW9uIGJlIGluc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgIFRoZSB0aW1lciBpbnN0YW5jZSBvYmplY3QsIGV4cG9zaW5nIHRoZSBzdG9wIGFuZCBraWxsIG1ldGhvZHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsb29wV2l0aERlbGF5KGVsZW1lbnRzLCBpbnRlcnZhbCwgb25FYWNoLCBvbkNvbXBsZXRlLCBpbnN0YW50PXRydWUpXG4gICAge1xuICAgICAgICBsZXQgdGltZXJJZCA9IG51bGw7XG4gICAgICAgIGxldCBpc1VzZXJTdG9wcGVkID0gZmFsc2U7IC8vIHVzZXIgaGFzIGlzVXNlclN0b3BwZWQgaXRcbiAgICAgICAgbGV0IGlzQ29tcGxldGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuZnJvbShlbGVtZW50cylcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NBcnJheSA9IFtdO1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIG5leHQgZWxlbWVudCBpbiB0aGEgYXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWFycmF5Lmxlbmd0aClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAob25Db21wbGV0ZSkgb25Db21wbGV0ZShwcm9ncmVzc0FycmF5LCBpc1VzZXJTdG9wcGVkKTtcbiAgICAgICAgICAgICAgICBpc0NvbXBsZXRlZCA9IHRydWVcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGltZXJJZCA9ICBsb29wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgaW50ZXJ2YWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAge251bWJlcn0gIG5ld0ludGVydmFsICBUaGUgbmV3IGludGVydmFsXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzZXRJbnRlcnZhbChuZXdJbnRlcnZhbClcbiAgICAgICAge1xuICAgICAgICAgICAga2lsbCgpXG5cbiAgICAgICAgICAgIGlmIChuZXdJbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxuICAgICAgICAgICAgICAgIHRpbWVySWQgPSBzZXRUaW1lcihpbnRlcnZhbCwgbmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdJbnRlcnZhbCA9PT0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IDBcbiAgICAgICAgICAgICAgICBuZXh0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wcyB0aGUgaXRlcmF0aW9uIGJ5IGluc3RhbnRseSBjb21wbGV0aW5nIHRoZSByZW1haW5pbmcgZWxlbWVudHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHN0b3AoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNDb21wbGV0ZWQpIHJldHVyblxuICAgICAgICAgICAgaXNVc2VyU3RvcHBlZCA9IHRydWVcbiAgICAgICAgICAgIHNldEludGVydmFsKDApXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcHMgdGhlIGl0ZXJhdGlvbiB3aXRob3V0IGNvbXBsZXRpbmcgdGhlIHJlbWFpbmcgYXJyYXkgZWxlbWVudHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGtpbGwoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoaXNDb21wbGV0ZWQpIHJldHVyblxuICAgICAgICAgICAgY2xlYXJUaW1lcih0aW1lcklkKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheWVkIGxvb3BcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBnZXQgbmV4dCBlbGVtZW50XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXkuc2hpZnQoKTtcblxuICAgICAgICAgICAgLy8gYXBwZW5kIHRvIHByb2dyZXNzXG4gICAgICAgICAgICBwcm9ncmVzc0FycmF5LnB1c2goZWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIGZpcmUgdGhlIG9uRWFjaEhhbmRsZXJcbiAgICAgICAgICAgIG9uRWFjaChlbGVtZW50LCBwcm9ncmVzc0FycmF5Lmxlbmd0aCAtIDEsIHByb2dyZXNzQXJyYXksIGludGVydmFsLCBpc1VzZXJTdG9wcGVkKTtcblxuICAgICAgICAgICAgLy8gcmVjdXJzZSB3aXRoIGRlbGF5XG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lcihpbnRlcnZhbCwgbmV4dCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9yIGltbWVkaWF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5leHQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGluaXRpYWwgdGltZXIgYW5kIGtpY2sgdGhpbmdzIG9mZlxuICAgICAgICB0aW1lcklkID0gIChpbnN0YW50KSA/IGxvb3AoKSA6IHNldFRpbWVyKGludGVydmFsLCBsb29wKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIHRpbWVyT2JqZWN0XG4gICAgICAgIHJldHVybiB7IHNldEludGVydmFsLCBzdG9wLCBraWxsLCBpbnRlcnZhbCB9O1xuICAgIH1cblxuICAgIHJldHVybiBsb29wV2l0aERlbGF5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVhY2hBZnRlclxuIl19