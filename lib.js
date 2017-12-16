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

    ;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFTQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsWUFBRCxFQUFjLGNBQWQsRUFDbEI7QUFDSTtBQUNBLE1BQUksU0FBSixDQUZKLENBSUk7O0FBQ0EsTUFBSSxZQUFKLEVBQ0E7QUFDSSxnQkFBWSxZQUFaO0FBQ0gsR0FIRCxDQUtBO0FBTEEsT0FPQTtBQUNJLGtCQUFZLG1CQUFDLEVBQUQsRUFBSSxNQUFKLEVBQ1o7QUFDSSxlQUFPLFdBQVcsRUFBWCxFQUFlLFNBQU8sSUFBdEIsQ0FBUDtBQUNILE9BSEQ7QUFJSCxLQWpCTCxDQW1CSTs7O0FBQ0EsTUFBSSxVQUFKLENBcEJKLENBc0JJOztBQUNBLE1BQUksY0FBSixFQUNBO0FBQ0ksaUJBQWEsY0FBYjtBQUNILEdBSEQsQ0FLQTtBQUxBLE9BT0E7QUFDSSxtQkFBYSxvQkFBQyxPQUFELEVBQ2I7QUFDSSxlQUFPLGFBQWEsT0FBYixDQUFQO0FBQ0gsT0FIRDtBQUlIO0FBRUQ7Ozs7Ozs7Ozs7OztBQVVBLFdBQVMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxRQUFqQyxFQUEyQyxNQUEzQyxFQUFtRCxVQUFuRCxFQUNBO0FBQUEsUUFEK0QsT0FDL0QsdUVBRHVFLElBQ3ZFO0FBQ0ksUUFBSSxVQUFVLElBQWQ7QUFDQSxRQUFNLFFBQVEsTUFBTSxJQUFOLENBQVcsUUFBWCxDQUFkO0FBQ0EsUUFBTSxnQkFBZ0IsRUFBdEI7QUFFQTs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0ksVUFBSSxDQUFDLE1BQU0sTUFBWCxFQUNBO0FBQ0ksWUFBSSxVQUFKLEVBQWdCLFdBQVcsYUFBWDtBQUNoQjtBQUNIOztBQUVELGdCQUFXLE1BQVg7QUFDSDs7QUFBQTtBQUVEOzs7Ozs7QUFLQSxhQUFTLFdBQVQsQ0FBcUIsV0FBckIsRUFDQTtBQUNJOztBQUVBLFVBQUksY0FBYyxDQUFsQixFQUNBO0FBQ0ksbUJBQVcsV0FBWDtBQUNBLGtCQUFVLFVBQVUsSUFBVixFQUFnQixRQUFoQixDQUFWO0FBQ0gsT0FKRCxNQUtLLElBQUksZ0JBQWdCLENBQXBCLEVBQ0w7QUFDSSxtQkFBVyxDQUFYO0FBQ0E7QUFDSDtBQUNKO0FBRUQ7Ozs7O0FBR0EsYUFBUyxJQUFULEdBQ0E7QUFDSSxrQkFBWSxDQUFaO0FBQ0g7QUFFRDs7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLGlCQUFXLE9BQVg7QUFDSDtBQUVEOzs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0k7QUFDQSxVQUFNLFVBQVUsTUFBTSxLQUFOLEVBQWhCLENBRkosQ0FJSTs7QUFDQSxvQkFBYyxJQUFkLENBQW1CLE9BQW5CLEVBTEosQ0FPSTs7QUFDQSxhQUFPLE9BQVAsRUFBZ0IsY0FBYyxNQUFkLEdBQXVCLENBQXZDLEVBQTBDLGFBQTFDLEVBQXlELFFBQXpELEVBUkosQ0FVSTs7QUFDQSxVQUFJLFdBQVcsQ0FBZixFQUNBO0FBQ0ksZUFBTyxVQUFVLElBQVYsRUFBZ0IsUUFBaEIsQ0FBUDtBQUNILE9BZEwsQ0FnQkk7OztBQUNBLGFBQU8sTUFBUDtBQUNILEtBOUVMLENBZ0ZJOzs7QUFDQSxjQUFZLE9BQUQsR0FBWSxNQUFaLEdBQXFCLFVBQVUsSUFBVixFQUFnQixRQUFoQixDQUFoQyxDQWpGSixDQW1GSTs7QUFDQSxXQUFPO0FBQUUsOEJBQUY7QUFBZSxnQkFBZjtBQUFxQixnQkFBckI7QUFBMkI7QUFBM0IsS0FBUDtBQUNIOztBQUVELFNBQU8sYUFBUDtBQUNILENBeklEOztlQTJJZSxTIiwiZmlsZSI6ImxpYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSB0aW1pbmcgbGlicmFyeSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggYXJyYXkncyB3aXRoIGFuIGludGVydmFsIGJldHdlZW4gZWFjaCBjYWxsXG4gKiBjb25zdCBteVRpbWVyID0gZWFjaEFmdGVyKClcbiAqIGNvbnN0IHRpbWVySW5zdGFuY2UgPSBteVRpbWVyKFsyLDQsOSwxNl0sMSxvbkVhY2hIYW5kbGVyLG9uQ29tcGxldGVIYW5kbGVyLGZhbHNlKVxuICogdGltZXJJbnN0YW5jZS5zdG9wKClcbiAqIHRpbWVySW5zdGFuY2Uua2lsbCgpXG4gKiB0aW1lckluc3RhbmNlLnNldEludGVydmFsKClcbiAqL1xuXG5jb25zdCBlYWNoQWZ0ZXIgPSAoc2V0VGltZXJGdW5jLGNsZWFyVGltZXJGdW5jKSA9Plxue1xuICAgIC8vIHNldCB0aGUgc2V0IHRpbWVyIGZ1bmN0aW9uXG4gICAgbGV0IG1ha2VUaW1lclxuXG4gICAgLy8gdXNlIHRoZSBnaXZlbiBmdW5jXG4gICAgaWYgKHNldFRpbWVyRnVuYylcbiAgICB7XG4gICAgICAgIG1ha2VUaW1lciA9IHNldFRpbWVyRnVuY1xuICAgIH1cblxuICAgIC8vIGZhbGxiYWNrIHRvIHNldFRpbWVvdXRcbiAgICBlbHNlXG4gICAge1xuICAgICAgICBtYWtlVGltZXIgPSAoZm4saW50ZXJ2KSA9PlxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgaW50ZXJ2KjEwMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0IHRoZSBjbGVhciB0aW1lciBmdW5jdGlvblxuICAgIGxldCBjbGVhclRpbWVyXG5cbiAgICAvLyB1c2UgdGhlIGdpdmVuIGZ1bmNcbiAgICBpZiAoY2xlYXJUaW1lckZ1bmMpXG4gICAge1xuICAgICAgICBjbGVhclRpbWVyID0gY2xlYXJUaW1lckZ1bmNcbiAgICB9XG5cbiAgICAvLyBmYWxsYmFjayB0byBjbGVhclRpbWVvdXRcbiAgICBlbHNlXG4gICAge1xuICAgICAgICBjbGVhclRpbWVyID0gKHRpbWVySWQpID0+XG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQodGltZXJJZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIGFuIGFycmF5IHdpdGggYSBnaXZlbiBpbnRlcnZhbCBiZXR3ZWVuIGVhY2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgICAgYXJyYXkgICAgICAgVGhlIGFycmF5XG4gICAgICogQHBhcmFtICB7bnVtYmVyfSAgICBpbnRlcnZhbCAgICBUaGUgaW50ZXJ2YWwgaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgb25FYWNoICAgICAgT24gZWFjaCBoYW5kbGVyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259ICBvbkNvbXBsZXRlICBPbiBjb21wbGV0ZSBoYW5kbGVyXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gICBpbnN0YW50ICAgICBTaG91bGQgdGhlIGZpcnN0IGl0ZXJhdGlvbiBiZSBpbnN0YW50XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICBUaGUgdGltZXIgaW5zdGFuY2Ugb2JqZWN0LCBleHBvc2luZyB0aGUgc3RvcCBhbmQga2lsbCBtZXRob2RzXG4gICAgICovXG4gICAgZnVuY3Rpb24gbG9vcFdpdGhEZWxheShlbGVtZW50cywgaW50ZXJ2YWwsIG9uRWFjaCwgb25Db21wbGV0ZSwgaW5zdGFudD10cnVlKVxuICAgIHtcbiAgICAgICAgbGV0IHRpbWVySWQgPSBudWxsO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5LmZyb20oZWxlbWVudHMpXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQXJyYXkgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSB0byB0aGUgbmV4dCBlbGVtZW50IGluIHRoYSBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghYXJyYXkubGVuZ3RoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKSBvbkNvbXBsZXRlKHByb2dyZXNzQXJyYXkpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aW1lcklkID0gIGxvb3AoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgaW50ZXJ2YWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAge251bWJlcn0gIG5ld0ludGVydmFsICBUaGUgbmV3IGludGVydmFsXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzZXRJbnRlcnZhbChuZXdJbnRlcnZhbClcbiAgICAgICAge1xuICAgICAgICAgICAga2lsbCgpXG5cbiAgICAgICAgICAgIGlmIChuZXdJbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxuICAgICAgICAgICAgICAgIHRpbWVySWQgPSBtYWtlVGltZXIobmV4dCwgaW50ZXJ2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3SW50ZXJ2YWwgPT09IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSAwXG4gICAgICAgICAgICAgICAgbmV4dCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcHMgdGhlIGl0ZXJhdGlvbiBieSBpbnN0YW50bHkgY29tcGxldGluZyB0aGUgcmVtYWluaW5nIGVsZW1lbnRzXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzdG9wKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoMClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wcyB0aGUgaXRlcmF0aW9uIHdpdGhvdXQgY29tcGxldGluZyB0aGUgcmVtYWluZyBhcnJheSBlbGVtZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24ga2lsbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNsZWFyVGltZXIodGltZXJJZClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGVsYXllZCBsb29wXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBsb29wKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gZ2V0IG5leHQgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5LnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0byBwcm9ncmVzc1xuICAgICAgICAgICAgcHJvZ3Jlc3NBcnJheS5wdXNoKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAvLyBmaXJlIHRoZSBvbkVhY2hIYW5kbGVyXG4gICAgICAgICAgICBvbkVhY2goZWxlbWVudCwgcHJvZ3Jlc3NBcnJheS5sZW5ndGggLSAxLCBwcm9ncmVzc0FycmF5LCBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIHJlY3Vyc2Ugd2l0aCBkZWxheVxuICAgICAgICAgICAgaWYgKGludGVydmFsID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFrZVRpbWVyKG5leHQsIGludGVydmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb3IgaW1tZWRpYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV4dCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgaW5pdGlhbCB0aW1lciBhbmQga2ljayB0aGluZ3Mgb2ZmXG4gICAgICAgIHRpbWVySWQgPSAgKGluc3RhbnQpID8gbG9vcCgpIDogbWFrZVRpbWVyKGxvb3AsIGludGVydmFsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIHRpbWVyT2JqZWN0XG4gICAgICAgIHJldHVybiB7IHNldEludGVydmFsLCBzdG9wLCBraWxsLCBpbnRlcnZhbCB9O1xuICAgIH1cblxuICAgIHJldHVybiBsb29wV2l0aERlbGF5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVhY2hBZnRlclxuIl19