const sinon = require('sinon')
const assert = require('chai').assert
const eachAfter = require('../lib.js').default()

const array = [2,4,9,16,25]

describe('Creation', () => {

    it('Should create a timer object', () => {
        const onEachHandler = () => {}
        const onCompleteHandler = () => {}
        const timerInstance = eachAfter([],1,onEachHandler,onCompleteHandler)
        assert.isObject(timerInstance)
        assert.property(timerInstance, 'stop')
        assert.property(timerInstance, 'kill')
        assert.property(timerInstance, 'setInterval')
        assert.property(timerInstance, 'interval')
    });

});

describe('Handlers', () => {

    it('Should call the onEachHandler n times', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler)
        clock.runAll();
        sinon.assert.callCount(onEachHandler, array.length)
        sinon.assert.calledOnce(onCompleteHandler)
    });

    it('Should be called once onEachHandler immeditately', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler)
        sinon.assert.calledOnce(onEachHandler)
        clock.runAll();
        sinon.assert.calledOnce(onCompleteHandler)
    });

    it('Should not call onEachHandler immeditately', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler, false)
        sinon.assert.notCalled(onEachHandler)
        clock.runAll();
        sinon.assert.calledOnce(onCompleteHandler)
    });

    it('Instant: onEachHandler should pass correct data', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler)
        sinon.assert.calledWith(onEachHandler, 2, 0, [2], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 4, 1, [2,4], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 9, 2, [2,4,9], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 16, 3, [2,4,9,16], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 25, 4, [2,4,9,16,25], 1);
        sinon.assert.notCalled(onCompleteHandler)
    });

    it('Not Instant: onEachHandler should pass correct data', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler, false)
        clock.next()
        sinon.assert.calledWith(onEachHandler, 2, 0, [2], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 4, 1, [2,4], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 9, 2, [2,4,9], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 16, 3, [2,4,9,16], 1);
        clock.next()
        sinon.assert.calledWith(onEachHandler, 25, 4, [2,4,9,16,25], 1);
        sinon.assert.notCalled(onCompleteHandler)
    });

});

describe('Kill', () => {

    it('Instant: Should call onEachHandler twice then no more', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,true)
        clock.next();
        sinon.assert.calledTwice(onEachHandler)
        timerInstance.kill();
        clock.runAll();
        sinon.assert.calledTwice(onEachHandler)
        sinon.assert.notCalled(onCompleteHandler)
    });

    it('Not Instant: Should call onEachHandler twice then no more', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,false)
        clock.next();
        clock.next();
        sinon.assert.calledTwice(onEachHandler)
        timerInstance.kill();
        clock.runAll();
        sinon.assert.calledTwice(onEachHandler)
        sinon.assert.notCalled(onCompleteHandler)
    });

});

describe('Stop', () => {

    it('Not Instant: Should call onEachHandler very time and the completion handler', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,false)
        clock.next();
        clock.next();
        sinon.assert.calledTwice(onEachHandler)
        timerInstance.stop();
        clock.runAll();
        sinon.assert.callCount(onEachHandler,5)
        sinon.assert.called(onCompleteHandler)
    });

    it('Instant: Should call onEachHandler very time and the completion handler', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,true)
        clock.next();
        sinon.assert.calledTwice(onEachHandler)
        timerInstance.stop();
        clock.runAll();
        sinon.assert.callCount(onEachHandler,5)
        sinon.assert.called(onCompleteHandler)
    });
});

describe('SetInterval', () => {

    it('Instant: setInterval to 0 should avoid using timers', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler)
        clock.next();
        sinon.assert.calledTwice(onEachHandler)
        timerInstance.setInterval(0);
        sinon.assert.callCount(onEachHandler,5)
        sinon.assert.called(onCompleteHandler)
    });

    it('Not Instant: setInterval to 0 should avoid using timers', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,false)
        clock.next();
        clock.next();
        sinon.assert.calledTwice(onEachHandler)
        timerInstance.setInterval(0);
        sinon.assert.callCount(onEachHandler,5)
        sinon.assert.called(onCompleteHandler)
    });

    it('Instant: setInterval to large value should slow down iteration ', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,true)
        timerInstance.setInterval(10);
        clock.tick(5000);
        sinon.assert.calledOnce(onEachHandler)
        sinon.assert.notCalled(onCompleteHandler)
    });

    it('Not Instant: setInterval to large value should slow down iteration ', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,false)
        timerInstance.setInterval(10);
        clock.tick(5000);
        sinon.assert.notCalled(onEachHandler)
        sinon.assert.notCalled(onCompleteHandler)
    });

    it('Instant: setInterval to small value should speed up iteration ', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,true)
        timerInstance.setInterval(0.01);
        clock.tick(1000);
        sinon.assert.callCount(onEachHandler,5)
        sinon.assert.called(onCompleteHandler)
    });

    it('Not Instant: setInterval to small value should speed up iteration ', () => {
        const clock = sinon.useFakeTimers();
        const onEachHandler = sinon.spy();
        const onCompleteHandler = sinon.spy();
        const timerInstance = eachAfter(array,1,onEachHandler,onCompleteHandler,false)
        timerInstance.setInterval(0.01);
        clock.tick(1000);
        sinon.assert.callCount(onEachHandler,5)
        sinon.assert.called(onCompleteHandler)
    });
});
