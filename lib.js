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
  if (timers && (setTimer && !clearTimer || !setTimer && clearTimer)) {
    throw new Error("Both setTimer & clearTimer must be set, or neither");
  } // Set the correct timer


  var setTimer = timers && timers.setTimer ? timers.setTimer : function (fn, interv) {
    return setTimeout(fn, interv * 1000);
  };
  var clearTimer = timers && timers.clearTimer ? timers.clearTimer : function (timerId) {
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
        timerId = setTimer(next, interval);
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
        return setTimer(next, interval);
      } // or immediate


      return next();
    } // get initial timer and kick things off


    timerId = instant ? loop() : setTimer(loop, interval); // return the timerObject

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsTUFBRCxFQUNsQjtBQUNJO0FBQ0EsTUFBSSxXQUFZLFlBQVksQ0FBQyxVQUFkLElBQThCLENBQUMsUUFBRCxJQUFhLFVBQXRELENBQUosRUFDQTtBQUNJLFVBQU8sSUFBSSxLQUFKLENBQVUsb0RBQVYsQ0FBUDtBQUNILEdBTEwsQ0FPSTs7O0FBQ0EsTUFBTSxXQUFZLFVBQVUsT0FBTyxRQUFsQixHQUNYLE9BQU8sUUFESSxHQUVYLFVBQUMsRUFBRCxFQUFJLE1BQUo7QUFBQSxXQUNFLFdBQVcsRUFBWCxFQUFlLFNBQU8sSUFBdEIsQ0FERjtBQUFBLEdBRk47QUFLQSxNQUFNLGFBQWMsVUFBVSxPQUFPLFVBQWxCLEdBQ2IsT0FBTyxVQURNLEdBRWIsVUFBQyxPQUFEO0FBQUEsV0FDRSxhQUFhLE9BQWIsQ0FERjtBQUFBLEdBRk47QUFLQTs7Ozs7Ozs7Ozs7QUFVQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsUUFBakMsRUFBMkMsTUFBM0MsRUFBbUQsVUFBbkQsRUFDQTtBQUFBLFFBRCtELE9BQy9ELHVFQUR1RSxJQUN2RTtBQUNJLFFBQUksVUFBVSxJQUFkO0FBQ0EsUUFBTSxRQUFRLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBZDtBQUNBLFFBQU0sZ0JBQWdCLEVBQXRCO0FBRUE7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLFVBQUksQ0FBQyxNQUFNLE1BQVgsRUFDQTtBQUNJLFlBQUksVUFBSixFQUFnQixXQUFXLGFBQVg7QUFDaEI7QUFDSDs7QUFFRCxnQkFBVyxNQUFYO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLGFBQVMsV0FBVCxDQUFxQixXQUFyQixFQUNBO0FBQ0k7O0FBRUEsVUFBSSxjQUFjLENBQWxCLEVBQ0E7QUFDSSxtQkFBVyxXQUFYO0FBQ0Esa0JBQVUsU0FBUyxJQUFULEVBQWUsUUFBZixDQUFWO0FBQ0gsT0FKRCxNQUtLLElBQUksZ0JBQWdCLENBQXBCLEVBQ0w7QUFDSSxtQkFBVyxDQUFYO0FBQ0E7QUFDSDtBQUNKO0FBRUQ7Ozs7O0FBR0EsYUFBUyxJQUFULEdBQ0E7QUFDSSxrQkFBWSxDQUFaO0FBQ0g7QUFFRDs7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLGlCQUFXLE9BQVg7QUFDSDtBQUVEOzs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0k7QUFDQSxVQUFNLFVBQVUsTUFBTSxLQUFOLEVBQWhCLENBRkosQ0FJSTs7QUFDQSxvQkFBYyxJQUFkLENBQW1CLE9BQW5CLEVBTEosQ0FPSTs7QUFDQSxhQUFPLE9BQVAsRUFBZ0IsY0FBYyxNQUFkLEdBQXVCLENBQXZDLEVBQTBDLGFBQTFDLEVBQXlELFFBQXpELEVBUkosQ0FVSTs7QUFDQSxVQUFJLFdBQVcsQ0FBZixFQUNBO0FBQ0ksZUFBTyxTQUFTLElBQVQsRUFBZSxRQUFmLENBQVA7QUFDSCxPQWRMLENBZ0JJOzs7QUFDQSxhQUFPLE1BQVA7QUFDSCxLQTlFTCxDQWdGSTs7O0FBQ0EsY0FBWSxPQUFELEdBQVksTUFBWixHQUFxQixTQUFTLElBQVQsRUFBZSxRQUFmLENBQWhDLENBakZKLENBbUZJOztBQUNBLFdBQU87QUFBRSw4QkFBRjtBQUFlLGdCQUFmO0FBQXFCLGdCQUFyQjtBQUEyQjtBQUEzQixLQUFQO0FBQ0g7O0FBRUQsU0FBTyxhQUFQO0FBQ0gsQ0F0SEQ7O2VBd0hlLFMiLCJmaWxlIjoibGliLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIHRpbWluZyBsaWJyYXJ5IGZvciBpdGVyYXRpbmcgdGhyb3VnaCBhcnJheSdzIHdpdGggYW4gaW50ZXJ2YWwgYmV0d2VlbiBlYWNoIGNhbGxcbiAqIGNvbnN0IG15VGltZXIgPSBlYWNoQWZ0ZXIoKVxuICogY29uc3QgdGltZXJJbnN0YW5jZSA9IG15VGltZXIoWzIsNCw5LDE2XSwxLG9uRWFjaEhhbmRsZXIsb25Db21wbGV0ZUhhbmRsZXIsZmFsc2UpXG4gKiB0aW1lckluc3RhbmNlLnN0b3AoKVxuICogdGltZXJJbnN0YW5jZS5raWxsKClcbiAqIHRpbWVySW5zdGFuY2Uuc2V0SW50ZXJ2YWwoKVxuICovXG5jb25zdCBlYWNoQWZ0ZXIgPSAodGltZXJzKSA9Plxue1xuICAgIC8vIE11c3Qgc2V0IGJvdGggdGltZXJzXG4gICAgaWYgKHRpbWVycyAmJiAoKHNldFRpbWVyICYmICFjbGVhclRpbWVyKSB8fCAoIXNldFRpbWVyICYmIGNsZWFyVGltZXIpKSlcbiAgICB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoXCJCb3RoIHNldFRpbWVyICYgY2xlYXJUaW1lciBtdXN0IGJlIHNldCwgb3IgbmVpdGhlclwiKSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBjb3JyZWN0IHRpbWVyXG4gICAgY29uc3Qgc2V0VGltZXIgPSAodGltZXJzICYmIHRpbWVycy5zZXRUaW1lcilcbiAgICAgICAgPyB0aW1lcnMuc2V0VGltZXJcbiAgICAgICAgOiAoZm4saW50ZXJ2KSA9PlxuICAgICAgICAgICAgc2V0VGltZW91dChmbiwgaW50ZXJ2KjEwMDApO1xuXG4gICAgY29uc3QgY2xlYXJUaW1lciA9ICh0aW1lcnMgJiYgdGltZXJzLmNsZWFyVGltZXIpXG4gICAgICAgID8gdGltZXJzLmNsZWFyVGltZXJcbiAgICAgICAgOiAodGltZXJJZCkgPT5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGVzIGFuIGFycmF5IHdpdGggYSBnaXZlbiBpbnRlcnZhbCBiZXR3ZWVuIGVhY2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSAge2FycmF5fSAgICAgYXJyYXkgICAgICAgVGhlIGFycmF5XG4gICAgICogQHBhcmFtICB7bnVtYmVyfSAgICBpbnRlcnZhbCAgICBUaGUgaW50ZXJ2YWwgaW4gc2Vjb25kc1xuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgb25FYWNoICAgICAgT24gZWFjaCBoYW5kbGVyXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259ICBvbkNvbXBsZXRlICBPbiBjb21wbGV0ZSBoYW5kbGVyXG4gICAgICogQHBhcmFtICB7Ym9vbGVhbn0gICBpbnN0YW50ICAgICBTaG91bGQgdGhlIGZpcnN0IGl0ZXJhdGlvbiBiZSBpbnN0YW50XG4gICAgICogQHJldHVybiB7T2JqZWN0fSAgICBUaGUgdGltZXIgaW5zdGFuY2Ugb2JqZWN0LCBleHBvc2luZyB0aGUgc3RvcCBhbmQga2lsbCBtZXRob2RzXG4gICAgICovXG4gICAgZnVuY3Rpb24gbG9vcFdpdGhEZWxheShlbGVtZW50cywgaW50ZXJ2YWwsIG9uRWFjaCwgb25Db21wbGV0ZSwgaW5zdGFudD10cnVlKVxuICAgIHtcbiAgICAgICAgbGV0IHRpbWVySWQgPSBudWxsO1xuICAgICAgICBjb25zdCBhcnJheSA9IEFycmF5LmZyb20oZWxlbWVudHMpXG4gICAgICAgIGNvbnN0IHByb2dyZXNzQXJyYXkgPSBbXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTW92ZSB0byB0aGUgbmV4dCBlbGVtZW50IGluIHRoYSBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbmV4dCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghYXJyYXkubGVuZ3RoKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChvbkNvbXBsZXRlKSBvbkNvbXBsZXRlKHByb2dyZXNzQXJyYXkpO1xuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aW1lcklkID0gIGxvb3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXRzIHRoZSBpbnRlcnZhbC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICB7bnVtYmVyfSAgbmV3SW50ZXJ2YWwgIFRoZSBuZXcgaW50ZXJ2YWxcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHNldEludGVydmFsKG5ld0ludGVydmFsKVxuICAgICAgICB7XG4gICAgICAgICAgICBraWxsKClcblxuICAgICAgICAgICAgaWYgKG5ld0ludGVydmFsID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IG5ld0ludGVydmFsXG4gICAgICAgICAgICAgICAgdGltZXJJZCA9IHNldFRpbWVyKG5leHQsIGludGVydmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld0ludGVydmFsID09PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGludGVydmFsID0gMFxuICAgICAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3BzIHRoZSBpdGVyYXRpb24gYnkgaW5zdGFudGx5IGNvbXBsZXRpbmcgdGhlIHJlbWFpbmluZyBlbGVtZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc3RvcCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldEludGVydmFsKDApXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcHMgdGhlIGl0ZXJhdGlvbiB3aXRob3V0IGNvbXBsZXRpbmcgdGhlIHJlbWFpbmcgYXJyYXkgZWxlbWVudHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGtpbGwoKVxuICAgICAgICB7XG4gICAgICAgICAgICBjbGVhclRpbWVyKHRpbWVySWQpXG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlbGF5ZWQgbG9vcFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIGdldCBuZXh0IGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheS5zaGlmdCgpO1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgdG8gcHJvZ3Jlc3NcbiAgICAgICAgICAgIHByb2dyZXNzQXJyYXkucHVzaChlbGVtZW50KTtcblxuICAgICAgICAgICAgLy8gZmlyZSB0aGUgb25FYWNoSGFuZGxlclxuICAgICAgICAgICAgb25FYWNoKGVsZW1lbnQsIHByb2dyZXNzQXJyYXkubGVuZ3RoIC0gMSwgcHJvZ3Jlc3NBcnJheSwgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvLyByZWN1cnNlIHdpdGggZGVsYXlcbiAgICAgICAgICAgIGlmIChpbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVyKG5leHQsIGludGVydmFsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gb3IgaW1tZWRpYXRlXG4gICAgICAgICAgICByZXR1cm4gbmV4dCgpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgaW5pdGlhbCB0aW1lciBhbmQga2ljayB0aGluZ3Mgb2ZmXG4gICAgICAgIHRpbWVySWQgPSAgKGluc3RhbnQpID8gbG9vcCgpIDogc2V0VGltZXIobG9vcCwgaW50ZXJ2YWwpO1xuXG4gICAgICAgIC8vIHJldHVybiB0aGUgdGltZXJPYmplY3RcbiAgICAgICAgcmV0dXJuIHsgc2V0SW50ZXJ2YWwsIHN0b3AsIGtpbGwsIGludGVydmFsIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvb3BXaXRoRGVsYXlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZWFjaEFmdGVyXG4iXX0=