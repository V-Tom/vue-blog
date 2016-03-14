'use strict';
void function () {
  let Vue;
  if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    Vue = require('vue');
  } else if (typeof window.Vue !== 'undefined') {
    Vue = window.Vue;
  } else {
    throw new Error("can'\t find Vue instance here !");
  }
  const getScrollEventTarget = function (element) {
    if (element) {
      return document.querySelector(element);
    }
    return window;
  };
  const getScrollTop = function () {
    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop || document.body.scrollTop);
  };
  const throttle = function () {
    return function () {
      var directive = this;
      if (directive.vm.scrollLimit) {
        directive.vm.disable = directive.vm.scrollReverse ? getScrollTop() >= directive.vm.scrollLimit : getScrollTop() < directive.vm.scrollLimit;
        directive.vm.$get(directive.expression);
      }
    }
  };
  Vue.directive('scroll', {
    doBind: function () {
      var directive = this;
      directive.scrollListener = throttle();
      directive.scrollEventTarget = getScrollEventTarget();
      directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener.bind(directive), false);
    },
    bind: function () {
      var directive = this;
      var tryBind = function () {
        directive.vm.$on('hook:ready', function () {
          directive.doBind();
        });
      };
      tryBind();
    },
    unbind () {
      this.scrollEventTarget.removeEventListener('scroll', this.scrollListener, false);
    }
  })
}();
