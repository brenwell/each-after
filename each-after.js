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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsTUFBRCxFQUNsQjtBQUNJO0FBQ0EsTUFBSSxXQUFZLE9BQU8sR0FBUCxJQUFjLENBQUMsT0FBTyxLQUF2QixJQUFrQyxDQUFDLE9BQU8sR0FBUixJQUFlLE9BQU8sS0FBbkUsQ0FBSixFQUNBO0FBQ0ksVUFBTyxJQUFJLEtBQUosQ0FBVSxvREFBVixDQUFQO0FBQ0gsR0FMTCxDQU9JOzs7QUFDQSxNQUFNLFdBQVksVUFBVSxPQUFPLEdBQWxCLEdBQ1gsT0FBTyxHQURJLEdBRVgsVUFBQyxJQUFELEVBQU8sSUFBUDtBQUFBLFdBQ0UsV0FBVyxJQUFYLEVBQWlCLE9BQUssSUFBdEIsQ0FERjtBQUFBLEdBRk47QUFLQSxNQUFNLGFBQWMsVUFBVSxPQUFPLEtBQWxCLEdBQ2IsT0FBTyxLQURNLEdBRWIsVUFBQyxPQUFEO0FBQUEsV0FDRSxhQUFhLE9BQWIsQ0FERjtBQUFBLEdBRk47QUFLQTs7Ozs7Ozs7Ozs7QUFVQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsUUFBakMsRUFBMkMsTUFBM0MsRUFBbUQsVUFBbkQsRUFDQTtBQUFBLFFBRCtELE9BQy9ELHVFQUR1RSxJQUN2RTtBQUNJLFFBQUksVUFBVSxJQUFkO0FBQ0EsUUFBTSxRQUFRLE1BQU0sSUFBTixDQUFXLFFBQVgsQ0FBZDtBQUNBLFFBQU0sZ0JBQWdCLEVBQXRCO0FBRUE7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLFVBQUksQ0FBQyxNQUFNLE1BQVgsRUFDQTtBQUNJLFlBQUksVUFBSixFQUFnQixXQUFXLGFBQVg7QUFDaEI7QUFDSDs7QUFFRCxnQkFBVyxNQUFYO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLGFBQVMsV0FBVCxDQUFxQixXQUFyQixFQUNBO0FBQ0k7O0FBRUEsVUFBSSxjQUFjLENBQWxCLEVBQ0E7QUFDSSxtQkFBVyxXQUFYO0FBQ0Esa0JBQVUsU0FBUyxRQUFULEVBQW1CLElBQW5CLENBQVY7QUFDSCxPQUpELE1BS0ssSUFBSSxnQkFBZ0IsQ0FBcEIsRUFDTDtBQUNJLG1CQUFXLENBQVg7QUFDQTtBQUNIO0FBQ0o7QUFFRDs7Ozs7QUFHQSxhQUFTLElBQVQsR0FDQTtBQUNJLGtCQUFZLENBQVo7QUFDSDtBQUVEOzs7OztBQUdBLGFBQVMsSUFBVCxHQUNBO0FBQ0ksaUJBQVcsT0FBWDtBQUNIO0FBRUQ7Ozs7O0FBR0EsYUFBUyxJQUFULEdBQ0E7QUFDSTtBQUNBLFVBQU0sVUFBVSxNQUFNLEtBQU4sRUFBaEIsQ0FGSixDQUlJOztBQUNBLG9CQUFjLElBQWQsQ0FBbUIsT0FBbkIsRUFMSixDQU9JOztBQUNBLGFBQU8sT0FBUCxFQUFnQixjQUFjLE1BQWQsR0FBdUIsQ0FBdkMsRUFBMEMsYUFBMUMsRUFBeUQsUUFBekQsRUFSSixDQVVJOztBQUNBLFVBQUksV0FBVyxDQUFmLEVBQ0E7QUFDSSxlQUFPLFNBQVMsUUFBVCxFQUFtQixJQUFuQixDQUFQO0FBQ0gsT0FkTCxDQWdCSTs7O0FBQ0EsYUFBTyxNQUFQO0FBQ0gsS0E5RUwsQ0FnRkk7OztBQUNBLGNBQVksT0FBRCxHQUFZLE1BQVosR0FBcUIsU0FBUyxRQUFULEVBQW1CLElBQW5CLENBQWhDLENBakZKLENBbUZJOztBQUNBLFdBQU87QUFBRSw4QkFBRjtBQUFlLGdCQUFmO0FBQXFCLGdCQUFyQjtBQUEyQjtBQUEzQixLQUFQO0FBQ0g7O0FBRUQsU0FBTyxhQUFQO0FBQ0gsQ0F0SEQ7O2VBd0hlLFMiLCJmaWxlIjoiZWFjaC1hZnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQSB0aW1pbmcgbGlicmFyeSBmb3IgaXRlcmF0aW5nIHRocm91Z2ggYXJyYXkncyB3aXRoIGFuIGludGVydmFsIGJldHdlZW4gZWFjaCBjYWxsXG4gKiBjb25zdCBteVRpbWVyID0gZWFjaEFmdGVyKClcbiAqIGNvbnN0IHRpbWVySW5zdGFuY2UgPSBteVRpbWVyKFsyLDQsOSwxNl0sMSxvbkVhY2hIYW5kbGVyLG9uQ29tcGxldGVIYW5kbGVyLGZhbHNlKVxuICogdGltZXJJbnN0YW5jZS5zdG9wKClcbiAqIHRpbWVySW5zdGFuY2Uua2lsbCgpXG4gKiB0aW1lckluc3RhbmNlLnNldEludGVydmFsKClcbiAqL1xuY29uc3QgZWFjaEFmdGVyID0gKHRpbWVycykgPT5cbntcbiAgICAvLyBNdXN0IHNldCBib3RoIHRpbWVyc1xuICAgIGlmICh0aW1lcnMgJiYgKCh0aW1lcnMuc2V0ICYmICF0aW1lcnMuY2xlYXIpIHx8ICghdGltZXJzLnNldCAmJiB0aW1lcnMuY2xlYXIpKSlcbiAgICB7XG4gICAgICAgIHRocm93IChuZXcgRXJyb3IoXCJCb3RoIHNldFRpbWVyICYgY2xlYXJUaW1lciBtdXN0IGJlIHNldCwgb3IgbmVpdGhlclwiKSk7XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSBjb3JyZWN0IHRpbWVyXG4gICAgY29uc3Qgc2V0VGltZXIgPSAodGltZXJzICYmIHRpbWVycy5zZXQpXG4gICAgICAgID8gdGltZXJzLnNldFxuICAgICAgICA6IChzZWNzLCBmdW5jKSA9PlxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jLCBzZWNzKjEwMDApO1xuXG4gICAgY29uc3QgY2xlYXJUaW1lciA9ICh0aW1lcnMgJiYgdGltZXJzLmNsZWFyKVxuICAgICAgICA/IHRpbWVycy5jbGVhclxuICAgICAgICA6ICh0aW1lcklkKSA9PlxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgYW4gYXJyYXkgd2l0aCBhIGdpdmVuIGludGVydmFsIGJldHdlZW4gZWFjaFxuICAgICAqXG4gICAgICogQHBhcmFtICB7YXJyYXl9ICAgICBhcnJheSAgICAgICBUaGUgYXJyYXlcbiAgICAgKiBAcGFyYW0gIHtudW1iZXJ9ICAgIGludGVydmFsICAgIFRoZSBpbnRlcnZhbCBpbiBzZWNvbmRzXG4gICAgICogQHBhcmFtICB7RnVuY3Rpb259ICBvbkVhY2ggICAgICBPbiBlYWNoIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtGdW5jdGlvbn0gIG9uQ29tcGxldGUgIE9uIGNvbXBsZXRlIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0gIHtib29sZWFufSAgIGluc3RhbnQgICAgIFNob3VsZCB0aGUgZmlyc3QgaXRlcmF0aW9uIGJlIGluc3RhbnRcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9ICAgIFRoZSB0aW1lciBpbnN0YW5jZSBvYmplY3QsIGV4cG9zaW5nIHRoZSBzdG9wIGFuZCBraWxsIG1ldGhvZHNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBsb29wV2l0aERlbGF5KGVsZW1lbnRzLCBpbnRlcnZhbCwgb25FYWNoLCBvbkNvbXBsZXRlLCBpbnN0YW50PXRydWUpXG4gICAge1xuICAgICAgICBsZXQgdGltZXJJZCA9IG51bGw7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gQXJyYXkuZnJvbShlbGVtZW50cylcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NBcnJheSA9IFtdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3ZlIHRvIHRoZSBuZXh0IGVsZW1lbnQgaW4gdGhhIGFycmF5XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBuZXh0KClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCFhcnJheS5sZW5ndGgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKG9uQ29tcGxldGUpIG9uQ29tcGxldGUocHJvZ3Jlc3NBcnJheSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpbWVySWQgPSAgbG9vcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHMgdGhlIGludGVydmFsLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtudW1iZXJ9ICBuZXdJbnRlcnZhbCAgVGhlIG5ldyBpbnRlcnZhbFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc2V0SW50ZXJ2YWwobmV3SW50ZXJ2YWwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtpbGwoKVxuXG4gICAgICAgICAgICBpZiAobmV3SW50ZXJ2YWwgPiAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGludGVydmFsID0gbmV3SW50ZXJ2YWxcbiAgICAgICAgICAgICAgICB0aW1lcklkID0gc2V0VGltZXIoaW50ZXJ2YWwsIG5leHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmV3SW50ZXJ2YWwgPT09IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgPSAwXG4gICAgICAgICAgICAgICAgbmV4dCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcHMgdGhlIGl0ZXJhdGlvbiBieSBpbnN0YW50bHkgY29tcGxldGluZyB0aGUgcmVtYWluaW5nIGVsZW1lbnRzXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzdG9wKClcbiAgICAgICAge1xuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoMClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wcyB0aGUgaXRlcmF0aW9uIHdpdGhvdXQgY29tcGxldGluZyB0aGUgcmVtYWluZyBhcnJheSBlbGVtZW50c1xuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24ga2lsbCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNsZWFyVGltZXIodGltZXJJZClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZGVsYXllZCBsb29wXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBsb29wKClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gZ2V0IG5leHQgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5LnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0byBwcm9ncmVzc1xuICAgICAgICAgICAgcHJvZ3Jlc3NBcnJheS5wdXNoKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAvLyBmaXJlIHRoZSBvbkVhY2hIYW5kbGVyXG4gICAgICAgICAgICBvbkVhY2goZWxlbWVudCwgcHJvZ3Jlc3NBcnJheS5sZW5ndGggLSAxLCBwcm9ncmVzc0FycmF5LCBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIHJlY3Vyc2Ugd2l0aCBkZWxheVxuICAgICAgICAgICAgaWYgKGludGVydmFsID4gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0VGltZXIoaW50ZXJ2YWwsIG5leHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvciBpbW1lZGlhdGVcbiAgICAgICAgICAgIHJldHVybiBuZXh0KClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCBpbml0aWFsIHRpbWVyIGFuZCBraWNrIHRoaW5ncyBvZmZcbiAgICAgICAgdGltZXJJZCA9ICAoaW5zdGFudCkgPyBsb29wKCkgOiBzZXRUaW1lcihpbnRlcnZhbCwgbG9vcCk7XG5cbiAgICAgICAgLy8gcmV0dXJuIHRoZSB0aW1lck9iamVjdFxuICAgICAgICByZXR1cm4geyBzZXRJbnRlcnZhbCwgc3RvcCwga2lsbCwgaW50ZXJ2YWwgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9vcFdpdGhEZWxheVxufVxuXG5leHBvcnQgZGVmYXVsdCBlYWNoQWZ0ZXJcbiJdfQ==