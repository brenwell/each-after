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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsTUFBRCxFQUNsQjtBQUNJO0FBQ0EsTUFBSSxXQUFZLFlBQVksQ0FBQyxVQUFkLElBQThCLENBQUMsUUFBRCxJQUFhLFVBQXRELENBQUosRUFDQTtBQUNJLFVBQU8sSUFBSSxLQUFKLENBQVUsb0RBQVYsQ0FBUDtBQUNILEdBTEwsQ0FPSTs7O0FBQ0EsTUFBTSxXQUFZLFVBQVUsT0FBTyxRQUFsQixHQUNYLE9BQU8sUUFESSxHQUVYLFVBQUMsRUFBRCxFQUFJLE1BQUo7QUFBQSxXQUNFLFdBQVcsRUFBWCxFQUFlLFNBQU8sSUFBdEIsQ0FERjtBQUFBLEdBRk47QUFLQSxNQUFNLGFBQWMsVUFBVSxPQUFPLFVBQWxCLEdBQ2IsT0FBTyxVQURNLEdBRWIsVUFBQyxPQUFEO0FBQUEsV0FDRSxhQUFhLE9BQWIsQ0FERjtBQUFBLEdBRk47QUFLQTs7Ozs7Ozs7Ozs7QUFVQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsUUFBakMsRUFBMkMsTUFBM0MsRUFBbUQsVUFBbkQsRUFDQTtBQUFBLFFBRCtELE9BQy9ELHVFQUR1RSxJQUN2RTtBQUNJLFFBQUksVUFBVSxJQUFkO0FBQ0EsUUFBTSxRQUFRLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBZDtBQUNBLFFBQU0sZ0JBQWdCLEVBQXRCO0FBRUE7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLFVBQUksQ0FBQyxNQUFNLE1BQVgsRUFDQTtBQUNJLFlBQUksVUFBSixFQUFnQixXQUFXLGFBQVg7QUFDaEI7QUFDSDs7QUFFRCxnQkFBVyxNQUFYO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLGFBQVMsV0FBVCxDQUFxQixXQUFyQixFQUNBO0FBQ0k7O0FBRUEsVUFBSSxjQUFjLENBQWxCLEVBQ0E7QUFDSSxtQkFBVyxXQUFYO0FBQ0Esa0JBQVUsU0FBUyxJQUFULEVBQWUsUUFBZixDQUFWO0FBQ0gsT0FKRCxNQUtLLElBQUksZ0JBQWdCLENBQXBCLEVBQ0w7QUFDSSxtQkFBVyxDQUFYO0FBQ0E7QUFDSDtBQUNKO0FBRUQ7Ozs7O0FBR0EsYUFBUyxJQUFULEdBQ0E7QUFDSSxrQkFBWSxDQUFaO0FBQ0g7QUFFRDs7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLGlCQUFXLE9BQVg7QUFDSDtBQUVEOzs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0k7QUFDQSxVQUFNLFVBQVUsTUFBTSxLQUFOLEVBQWhCLENBRkosQ0FJSTs7QUFDQSxvQkFBYyxJQUFkLENBQW1CLE9BQW5CLEVBTEosQ0FPSTs7QUFDQSxhQUFPLE9BQVAsRUFBZ0IsY0FBYyxNQUFkLEdBQXVCLENBQXZDLEVBQTBDLGFBQTFDLEVBQXlELFFBQXpELEVBUkosQ0FVSTs7QUFDQSxVQUFJLFdBQVcsQ0FBZixFQUNBO0FBQ0ksZUFBTyxTQUFTLElBQVQsRUFBZSxRQUFmLENBQVA7QUFDSCxPQWRMLENBZ0JJOzs7QUFDQSxhQUFPLE1BQVA7QUFDSCxLQTlFTCxDQWdGSTs7O0FBQ0EsY0FBWSxPQUFELEdBQVksTUFBWixHQUFxQixTQUFTLElBQVQsRUFBZSxRQUFmLENBQWhDLENBakZKLENBbUZJOztBQUNBLFdBQU87QUFBRSw4QkFBRjtBQUFlLGdCQUFmO0FBQXFCLGdCQUFyQjtBQUEyQjtBQUEzQixLQUFQO0FBQ0g7O0FBRUQsU0FBTyxhQUFQO0FBQ0gsQ0F0SEQ7O2VBd0hlLFMiLCJmaWxlIjoiZWFjaC1hZnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSB0aW1pbmcgbGlicmFyeSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggYXJyYXkncyB3aXRoIGFuIGludGVydmFsIGJldHdlZW4gZWFjaCBjYWxsXG4gKiBjb25zdCBteVRpbWVyID0gZWFjaEFmdGVyKClcbiAqIGNvbnN0IHRpbWVySW5zdGFuY2UgPSBteVRpbWVyKFsyLDQsOSwxNl0sMSxvbkVhY2hIYW5kbGVyLG9uQ29tcGxldGVIYW5kbGVyLGZhbHNlKVxuICogdGltZXJJbnN0YW5jZS5zdG9wKClcbiAqIHRpbWVySW5zdGFuY2Uua2lsbCgpXG4gKiB0aW1lckluc3RhbmNlLnNldEludGVydmFsKClcbiAqL1xuY29uc3QgZWFjaEFmdGVyID0gKHRpbWVycykgPT5cbntcbiAgICAvLyBNdXN0IHNldCBib3RoIHRpbWVyc1xuICAgIGlmICh0aW1lcnMgJiYgKChzZXRUaW1lciAmJiAhY2xlYXJUaW1lcikgfHwgKCFzZXRUaW1lciAmJiBjbGVhclRpbWVyKSkpXG4gICAge1xuICAgICAgICB0aHJvdyAobmV3IEVycm9yKFwiQm90aCBzZXRUaW1lciAmIGNsZWFyVGltZXIgbXVzdCBiZSBzZXQsIG9yIG5laXRoZXJcIikpO1xuICAgIH1cblxuICAgIC8vIFNldCB0aGUgY29ycmVjdCB0aW1lclxuICAgIGNvbnN0IHNldFRpbWVyID0gKHRpbWVycyAmJiB0aW1lcnMuc2V0VGltZXIpXG4gICAgICAgID8gdGltZXJzLnNldFRpbWVyXG4gICAgICAgIDogKGZuLGludGVydikgPT5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZm4sIGludGVydioxMDAwKTtcblxuICAgIGNvbnN0IGNsZWFyVGltZXIgPSAodGltZXJzICYmIHRpbWVycy5jbGVhclRpbWVyKVxuICAgICAgICA/IHRpbWVycy5jbGVhclRpbWVyXG4gICAgICAgIDogKHRpbWVySWQpID0+XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG5cbiAgICAvKipcbiAgICAgKiBJdGVyYXRlcyBhbiBhcnJheSB3aXRoIGEgZ2l2ZW4gaW50ZXJ2YWwgYmV0d2VlbiBlYWNoXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHthcnJheX0gICAgIGFycmF5ICAgICAgIFRoZSBhcnJheVxuICAgICAqIEBwYXJhbSAge251bWJlcn0gICAgaW50ZXJ2YWwgICAgVGhlIGludGVydmFsIGluIHNlY29uZHNcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIG9uRWFjaCAgICAgIE9uIGVhY2ggaGFuZGxlclxuICAgICAqIEBwYXJhbSAge0Z1bmN0aW9ufSAgb25Db21wbGV0ZSAgT24gY29tcGxldGUgaGFuZGxlclxuICAgICAqIEBwYXJhbSAge2Jvb2xlYW59ICAgaW5zdGFudCAgICAgU2hvdWxkIHRoZSBmaXJzdCBpdGVyYXRpb24gYmUgaW5zdGFudFxuICAgICAqIEByZXR1cm4ge09iamVjdH0gICAgVGhlIHRpbWVyIGluc3RhbmNlIG9iamVjdCwgZXhwb3NpbmcgdGhlIHN0b3AgYW5kIGtpbGwgbWV0aG9kc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGxvb3BXaXRoRGVsYXkoZWxlbWVudHMsIGludGVydmFsLCBvbkVhY2gsIG9uQ29tcGxldGUsIGluc3RhbnQ9dHJ1ZSlcbiAgICB7XG4gICAgICAgIGxldCB0aW1lcklkID0gbnVsbDtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBBcnJheS5mcm9tKGVsZW1lbnRzKVxuICAgICAgICBjb25zdCBwcm9ncmVzc0FycmF5ID0gW107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vdmUgdG8gdGhlIG5leHQgZWxlbWVudCBpbiB0aGEgYXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIWFycmF5Lmxlbmd0aClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAob25Db21wbGV0ZSkgb25Db21wbGV0ZShwcm9ncmVzc0FycmF5KTtcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGltZXJJZCA9ICBsb29wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0cyB0aGUgaW50ZXJ2YWwuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAge251bWJlcn0gIG5ld0ludGVydmFsICBUaGUgbmV3IGludGVydmFsXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzZXRJbnRlcnZhbChuZXdJbnRlcnZhbClcbiAgICAgICAge1xuICAgICAgICAgICAga2lsbCgpXG5cbiAgICAgICAgICAgIGlmIChuZXdJbnRlcnZhbCA+IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSBuZXdJbnRlcnZhbFxuICAgICAgICAgICAgICAgIHRpbWVySWQgPSBzZXRUaW1lcihuZXh0LCBpbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZXdJbnRlcnZhbCA9PT0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnRlcnZhbCA9IDBcbiAgICAgICAgICAgICAgICBuZXh0KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wcyB0aGUgaXRlcmF0aW9uIGJ5IGluc3RhbnRseSBjb21wbGV0aW5nIHRoZSByZW1haW5pbmcgZWxlbWVudHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHN0b3AoKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgwKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3BzIHRoZSBpdGVyYXRpb24gd2l0aG91dCBjb21wbGV0aW5nIHRoZSByZW1haW5nIGFycmF5IGVsZW1lbnRzXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBraWxsKClcbiAgICAgICAge1xuICAgICAgICAgICAgY2xlYXJUaW1lcih0aW1lcklkKVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBkZWxheWVkIGxvb3BcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AoKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBnZXQgbmV4dCBlbGVtZW50XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXJyYXkuc2hpZnQoKTtcblxuICAgICAgICAgICAgLy8gYXBwZW5kIHRvIHByb2dyZXNzXG4gICAgICAgICAgICBwcm9ncmVzc0FycmF5LnB1c2goZWxlbWVudCk7XG5cbiAgICAgICAgICAgIC8vIGZpcmUgdGhlIG9uRWFjaEhhbmRsZXJcbiAgICAgICAgICAgIG9uRWFjaChlbGVtZW50LCBwcm9ncmVzc0FycmF5Lmxlbmd0aCAtIDEsIHByb2dyZXNzQXJyYXksIGludGVydmFsKTtcblxuICAgICAgICAgICAgLy8gcmVjdXJzZSB3aXRoIGRlbGF5XG4gICAgICAgICAgICBpZiAoaW50ZXJ2YWwgPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lcihuZXh0LCBpbnRlcnZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9yIGltbWVkaWF0ZVxuICAgICAgICAgICAgcmV0dXJuIG5leHQoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IGluaXRpYWwgdGltZXIgYW5kIGtpY2sgdGhpbmdzIG9mZlxuICAgICAgICB0aW1lcklkID0gIChpbnN0YW50KSA/IGxvb3AoKSA6IHNldFRpbWVyKGxvb3AsIGludGVydmFsKTtcblxuICAgICAgICAvLyByZXR1cm4gdGhlIHRpbWVyT2JqZWN0XG4gICAgICAgIHJldHVybiB7IHNldEludGVydmFsLCBzdG9wLCBraWxsLCBpbnRlcnZhbCB9O1xuICAgIH1cblxuICAgIHJldHVybiBsb29wV2l0aERlbGF5XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVhY2hBZnRlclxuIl19