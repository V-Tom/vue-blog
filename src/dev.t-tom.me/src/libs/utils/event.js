(() => {
  'use strict';

  let app = {};
  const version = '0.0.1';

  //bind
  app.on = (el, eventName, callback) => {
    if (el.nodeType === 1) {
      if (window.addEventListener) {
        el.addEventListener(eventName, callback, false)
      } else if (window.attachEvent) {
        el.attachEvent(eventName, callback);
      } else {
        el['on' + eventName] = callback;
      }
    } else {
      console.log(el + 'isn\'t a DOM element');
    }
  };

  //once
  app.once = (el, eventName, callback)=> {
    let ofn;
    app.on(el, eventName, ofn = ()=> {
      el.removeEventListener(eventName, ofn);
      callback && callback.apply(el);
    });
  };


  //fire
  //TODO what is detail ? see more info about DOM.initCustomEvent
  app.triggerEvent = (el, eventName, detail) => {
    if (el.nodeType === 1) {
      var event = document.createEvent("CustomEvent");
      event.initCustomEvent(eventName, true, true, detail);
      el.dispatchEvent(event);
    } else {
      console.log(el + 'isn\'t a DOM element');
    }
  };


  //exports
  //-----------------------------------
  module.exports = {
    on: app.on
  }
})();

