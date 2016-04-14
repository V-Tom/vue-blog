'use strict';

+function () {
  var Vue;

  if (typeof module !== 'undefined' && typeof exports !== 'undefined') {
    Vue = require('vue');
  } else if (typeof window.Vue !== 'undefined') {
    Vue = window.Vue;
  }

  var throttle = function (fn, delay) {
    var now, lastExec, timer, context, args;

    var execute = function () {
      fn.apply(context, args);
      lastExec = now;
    };

    return function () {
      context = this;
      args = arguments;

      now = Date.now();

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (!lastExec) {
        execute();
      } else {
        var diff = delay - (now - lastExec);
        if (diff < 0) {
          execute();
        } else {
          timer = setTimeout(function () {
            execute();
          }, diff);
        }
      }
    };
  };

  var getScrollTop = function (element) {
    if (element === window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }
    return element.scrollTop;
  };

  var getComputedStyle = document.defaultView.getComputedStyle;

  var getScrollEventTarget = function (element) {
    var currentNode = element;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
      var overflowY = getComputedStyle(currentNode)['overflowY'];
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return null;
  };

  var getVisibleHeight = function (element) {
    if (element === window) {
      return document.documentElement.clientHeight;
    }

    return element.clientHeight;
  };

  var getElementTop = function (element) {
    if (element.nodeType == 1) {
      return element.getBoundingClientRect().top + getScrollTop(window) - document.documentElement.clientTop;
    } else {
      return getScrollTop(window);
    }
  };

  var isAttached = function (element) {
    var currentNode = element.parentNode;
    while (currentNode) {
      if (currentNode.tagName === 'HTML') {
        return true;
      }
      if (currentNode.nodeType === 11) {
        return false;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  };

  Vue.directive('infiniteScroll', {
    doBind: function () {
      if (this.binded) return;
      this.binded = true;

      var directive = this;
      var element = directive.el;

      directive.scrollEventTarget = window;
      directive.scrollListener = throttle(directive.doCheck.bind(directive), 200);
      directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

      var disabledExpr = 'busy';
      var disabled = false;
      if (disabledExpr) {
        this.vm.$watch(disabledExpr, function (value) {
          directive.disabled = value;
        });
        disabled = !!directive.vm.$get(disabledExpr);
      }
      directive.disabled = disabled;

      var distanceExpr = element.getAttribute('infinite-scroll-distance') || '100';
      var distance = 0;
      if (distanceExpr) {
        distance = Number(directive.vm.$get(distanceExpr));
        if (isNaN(distance)) {
          distance = 0;
        }
      }
      directive.distance = distance;

      var immediateCheckExpr = element.getAttribute('infinite-scroll-immediate-check');
      var immediateCheck = true;
      if (immediateCheckExpr) {
        immediateCheck = !!directive.vm.$get(immediateCheckExpr);
      }

      if (immediateCheck) {
        directive.doCheck();
      }

      var eventName = element.getAttribute('infinite-scroll-listen-for-event');
      if (eventName) {
        directive.vm.$on(eventName, function () {
          directive.doCheck();
        });
      }
    },

    doCheck: function () {
      var scrollEventTarget = this.scrollEventTarget;//window
      var element = this.el;
      var distance = this.distance;
      if (this.disabled) return;
      var viewportScrollTop = getScrollTop(scrollEventTarget);
      var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);
      var shouldTrigger = false;
      if (scrollEventTarget !== element) {
        var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;
        shouldTrigger = viewportBottom + distance >= elementBottom;
      } else {
        shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
      }
      if (shouldTrigger && this.expression) {
        this.vm.$get(this.expression);
      }
    },

    bind: function () {
      var directive = this;
      var element = this.el;

      directive.vm.$on('hook:ready', function () {
        if (isAttached(element)) {
          directive.doBind();
        }
      });

      this.bindTryCount = 0;

      var tryBind = function () {
        if (directive.bindTryCount > 10) return;
        directive.bindTryCount++;
        if (isAttached(element)) {
          directive.doBind();
        } else {
          setTimeout(tryBind, 50);
        }
      };

      tryBind();
    },

    unbind() {
      this.scrollEventTarget.removeEventListener('scroll', this.scrollListener);
    }
  });
}();
