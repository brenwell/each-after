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
var eachAfter = function eachAfter(setTimerFunc, clearTimerFunc) {
  // set the set timer function
  var makeTimer; // use the given func

  if (setTimerFunc) {
    makeTimer = setTimerFunc;
  } // fallback to setTimeout
  else {
      makeTimer = function makeTimer(fn, interv) {
        return setTimeout(fn, interv * 1000);
      };
    } // set the clear timer function


  var clearTimer; // use the given func

  if (clearTimerFunc) {
    clearTimer = clearTimerFunc;
  } // fallback to clearTimeout
  else {
      clearTimer = function clearTimer(timerId) {
        return clearTimeout(timerId);
      };
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


  function loopWithDelay(elements, interval, onEach, onComplete) {
    var instant = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var timerId = null;
    var array = Array.from(elements);
    var progressArray = [];
    /**
     * Move to the next element in tha array
     */

    function next() {
      if (!array.length) {
        if (onComplete) onComplete(progressArray);
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
        timerId = makeTimer(next, interval);
      } else if (newInterval === 0) {
        interval = 0;
        next();
      }
    }
    /**
     * Stops the iteration by instantly completing the remaining elements
     */


    function stop() {
      setInterval(0);
    }
    /**
     * Stops the iteration without completing the remaing array elements
     */


    function kill() {
      clearTimer(timerId);
    }
    /**
     * The delayed loop
     */


    function loop() {
      // get next element
      var element = array.shift(); // append to progress

      progressArray.push(element); // fire the onEachHandler

      onEach(element, progressArray.length - 1, progressArray, interval); // recurse with delay

      if (interval > 0) {
        return makeTimer(next, interval);
      } // or immediate


      return next();
    } // get initial timer and kick things off


    timerId = instant ? loop() : makeTimer(loop, interval); // return the timerObject

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsWUFBRCxFQUFjLGNBQWQsRUFDbEI7QUFDSTtBQUNBLE1BQUksU0FBSixDQUZKLENBSUk7O0FBQ0EsTUFBSSxZQUFKLEVBQ0E7QUFDSSxnQkFBWSxZQUFaO0FBQ0gsR0FIRCxDQUtBO0FBTEEsT0FPQTtBQUNJLGtCQUFZLG1CQUFDLEVBQUQsRUFBSSxNQUFKLEVBQ1o7QUFDSSxlQUFPLFdBQVcsRUFBWCxFQUFlLFNBQU8sSUFBdEIsQ0FBUDtBQUNILE9BSEQ7QUFJSCxLQWpCTCxDQW1CSTs7O0FBQ0EsTUFBSSxVQUFKLENBcEJKLENBc0JJOztBQUNBLE1BQUksY0FBSixFQUNBO0FBQ0ksaUJBQWEsY0FBYjtBQUNILEdBSEQsQ0FLQTtBQUxBLE9BT0E7QUFDSSxtQkFBYSxvQkFBQyxPQUFELEVBQ2I7QUFDSSxlQUFPLGFBQWEsT0FBYixDQUFQO0FBQ0gsT0FIRDtBQUlIO0FBRUQ7Ozs7Ozs7Ozs7OztBQVVBLFdBQVMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxRQUFqQyxFQUEyQyxNQUEzQyxFQUFtRCxVQUFuRCxFQUNBO0FBQUEsUUFEK0QsT0FDL0QsdUVBRHVFLElBQ3ZFO0FBQ0ksUUFBSSxVQUFVLElBQWQ7QUFDQSxRQUFNLFFBQVEsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFkO0FBQ0EsUUFBTSxnQkFBZ0IsRUFBdEI7QUFFQTs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0ksVUFBSSxDQUFDLE1BQU0sTUFBWCxFQUNBO0FBQ0ksWUFBSSxVQUFKLEVBQWdCLFdBQVcsYUFBWDtBQUNoQjtBQUNIOztBQUVELGdCQUFXLE1BQVg7QUFDSDtBQUVEOzs7Ozs7O0FBS0EsYUFBUyxXQUFULENBQXFCLFdBQXJCLEVBQ0E7QUFDSTs7QUFFQSxVQUFJLGNBQWMsQ0FBbEIsRUFDQTtBQUNJLG1CQUFXLFdBQVg7QUFDQSxrQkFBVSxVQUFVLElBQVYsRUFBZ0IsUUFBaEIsQ0FBVjtBQUNILE9BSkQsTUFLSyxJQUFJLGdCQUFnQixDQUFwQixFQUNMO0FBQ0ksbUJBQVcsQ0FBWDtBQUNBO0FBQ0g7QUFDSjtBQUVEOzs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0ksa0JBQVksQ0FBWjtBQUNIO0FBRUQ7Ozs7O0FBR0EsYUFBUyxJQUFULEdBQ0E7QUFDSSxpQkFBVyxPQUFYO0FBQ0g7QUFFRDs7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJO0FBQ0EsVUFBTSxVQUFVLE1BQU0sS0FBTixFQUFoQixDQUZKLENBSUk7O0FBQ0Esb0JBQWMsSUFBZCxDQUFtQixPQUFuQixFQUxKLENBT0k7O0FBQ0EsYUFBTyxPQUFQLEVBQWdCLGNBQWMsTUFBZCxHQUF1QixDQUF2QyxFQUEwQyxhQUExQyxFQUF5RCxRQUF6RCxFQVJKLENBVUk7O0FBQ0EsVUFBSSxXQUFXLENBQWYsRUFDQTtBQUNJLGVBQU8sVUFBVSxJQUFWLEVBQWdCLFFBQWhCLENBQVA7QUFDSCxPQWRMLENBZ0JJOzs7QUFDQSxhQUFPLE1BQVA7QUFDSCxLQTlFTCxDQWdGSTs7O0FBQ0EsY0FBWSxPQUFELEdBQVksTUFBWixHQUFxQixVQUFVLElBQVYsRUFBZ0IsUUFBaEIsQ0FBaEMsQ0FqRkosQ0FtRkk7O0FBQ0EsV0FBTztBQUFFLDhCQUFGO0FBQWUsZ0JBQWY7QUFBcUIsZ0JBQXJCO0FBQTJCO0FBQTNCLEtBQVA7QUFDSDs7QUFFRCxTQUFPLGFBQVA7QUFDSCxDQXpJRDs7ZUEySWUsUyIsImZpbGUiOiJsaWIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEEgdGltaW5nIGxpYnJhcnkgZm9yIGl0ZXJhdGluZyB0aHJvdWdoIGFycmF5J3Mgd2l0aCBhbiBpbnRlcnZhbCBiZXR3ZWVuIGVhY2ggY2FsbFxuICogY29uc3QgbXlUaW1lciA9IGVhY2hBZnRlcigpXG4gKiBjb25zdCB0aW1lckluc3RhbmNlID0gbXlUaW1lcihbMiw0LDksMTZdLDEsb25FYWNoSGFuZGxlcixvbkNvbXBsZXRlSGFuZGxlcixmYWxzZSlcbiAqIHRpbWVySW5zdGFuY2Uuc3RvcCgpXG4gKiB0aW1lckluc3RhbmNlLmtpbGwoKVxuICogdGltZXJJbnN0YW5jZS5zZXRJbnRlcnZhbCgpXG4gKi9cbmNvbnN0IGVhY2hBZnRlciA9IChzZXRUaW1lckZ1bmMsY2xlYXJUaW1lckZ1bmMpID0+XG57XG4gICAgLy8gc2V0IHRoZSBzZXQgdGltZXIgZnVuY3Rpb25cbiAgICBsZXQgbWFrZVRpbWVyXG5cbiAgICAvLyB1c2UgdGhlIGdpdmVuIGZ1bmNcbiAgICBpZiAoc2V0VGltZXJGdW5jKVxuICAgIHtcbiAgICAgICAgbWFrZVRpbWVyID0gc2V0VGltZXJGdW5jXG4gICAgfVxuXG4gICAgLy8gZmFsbGJhY2sgdG8gc2V0VGltZW91dFxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIG1ha2VUaW1lciA9IChmbixpbnRlcnYpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCBpbnRlcnYqMTAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXQgdGhlIGNsZWFyIHRpbWVyIGZ1bmN0aW9uXG4gICAgbGV0IGNsZWFyVGltZXJcblxuICAgIC8vIHVzZSB0aGUgZ2l2ZW4gZnVuY1xuICAgIGlmIChjbGVhclRpbWVyRnVuYylcbiAgICB7XG4gICAgICAgIGNsZWFyVGltZXIgPSBjbGVhclRpbWVyRnVuY1xuICAgIH1cblxuICAgIC8vIGZhbGxiYWNrIHRvIGNsZWFyVGltZW91dFxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGNsZWFyVGltZXIgPSAodGltZXJJZCkgPT5cbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dCh0aW1lcklkKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgYW4gYXJyYXkgd2l0aCBhIGdpdmVuIGludGVydmFsIGJldHdlZW4gZWFjaFxuICAgICAqXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgICBhcnJheSAgICAgICBUaGUgYXJyYXlcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9ICAgIGludGVydmFsICAgIFRoZSBpbnRlcnZhbCBpbiBzZWNvbmRzXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259ICBvbkVhY2ggICAgICBPbiBlYWNoIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIG9uQ29tcGxldGUgIE9uIGNvbXBsZXRlIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgIGluc3RhbnQgICAgIFNob3VsZCB0aGUgZmlyc3QgaXRlcmF0aW9uIGJlIGluc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgIFRoZSB0aW1lciBpbnN0YW5jZSBvYmplY3QsIGV4cG9zaW5nIHRoZSBzdG9wIGFuZCBraWxsIG1ldGhvZHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsb29wV2l0aERlbGF5KGVsZW1lbnRzLCBpbnRlcnZhbCwgb25FYWNoLCBvbkNvbXBsZXRlLCBpbnN0YW50PXRydWUpXG4gICAge1xuICAgICAgICBsZXQgdGltZXJJZCA9IG51bGw7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuZnJvbShlbGVtZW50cylcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NBcnJheSA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IGVsZW1lbnQgaW4gdGhhIGFycmF5XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBuZXh0KClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFhcnJheS5sZW5ndGgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpIG9uQ29tcGxldGUocHJvZ3Jlc3NBcnJheSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpbWVySWQgPSAgbG9vcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGludGVydmFsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBuZXdJbnRlcnZhbCAgVGhlIG5ldyBpbnRlcnZhbFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2V0SW50ZXJ2YWwobmV3SW50ZXJ2YWwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtpbGwoKVxuXG4gICAgICAgICAgICBpZiAobmV3SW50ZXJ2YWwgPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcbiAgICAgICAgICAgICAgICB0aW1lcklkID0gbWFrZVRpbWVyKG5leHQsIGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0ludGVydmFsID09PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGludGVydmFsID0gMFxuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3BzIHRoZSBpdGVyYXRpb24gYnkgaW5zdGFudGx5IGNvbXBsZXRpbmcgdGhlIHJlbWFpbmluZyBlbGVtZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc3RvcCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldEludGVydmFsKDApXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcHMgdGhlIGl0ZXJhdGlvbiB3aXRob3V0IGNvbXBsZXRpbmcgdGhlIHJlbWFpbmcgYXJyYXkgZWxlbWVudHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGtpbGwoKVxuICAgICAgICB7XG4gICAgICAgICAgICBjbGVhclRpbWVyKHRpbWVySWQpXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlbGF5ZWQgbG9vcFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGdldCBuZXh0IGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgdG8gcHJvZ3Jlc3NcbiAgICAgICAgICAgIHByb2dyZXNzQXJyYXkucHVzaChlbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gZmlyZSB0aGUgb25FYWNoSGFuZGxlclxuICAgICAgICAgICAgb25FYWNoKGVsZW1lbnQsIHByb2dyZXNzQXJyYXkubGVuZ3RoIC0gMSwgcHJvZ3Jlc3NBcnJheSwgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvLyByZWN1cnNlIHdpdGggZGVsYXlcbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1ha2VUaW1lcihuZXh0LCBpbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9yIGltbWVkaWF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5leHQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGluaXRpYWwgdGltZXIgYW5kIGtpY2sgdGhpbmdzIG9mZlxuICAgICAgICB0aW1lcklkID0gIChpbnN0YW50KSA/IGxvb3AoKSA6IG1ha2VUaW1lcihsb29wLCBpbnRlcnZhbCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSB0aW1lck9iamVjdFxuICAgICAgICByZXR1cm4geyBzZXRJbnRlcnZhbCwgc3RvcCwga2lsbCwgaW50ZXJ2YWwgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9vcFdpdGhEZWxheVxufVxuXG5leHBvcnQgZGVmYXVsdCBlYWNoQWZ0ZXJcbiJdfQ==