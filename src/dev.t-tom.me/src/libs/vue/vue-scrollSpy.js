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
  var getScrollEventTarget = function () {
    return window;
  };
  var getOffsetTop = function (element) {
    return element.offsetTop || element.getBoundingClientRect().top;
  };
  var throttle = function () {
    return function () {
      var directive = this;
      console.log('srcoll !');
    }
  };
  var escapeSelector = function (selector) {
    return selector.replace(/[!"$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&")
  };
  Vue.directive('scrollspy', {
    params: ['listen'],
    doBind: function () {
      var directive = this;
      directive.selector = '[data-level]';
      directive.cache = [];
      directive.scrollSpyBody = document.querySelector('.article-scrollSpy') || window;
      directive.contentBody = document.querySelector('.article-content') || window;
      directive.init();
      directive.scrollListener = throttle();
      directive.scrollEventTarget = window;
      directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener.bind(directive), false);
    },
    init: function () {
      var directive = this;
      this.vm.$watch(this.params.listen, function () {
        [].slice.call(directive.contentBody.querySelectorAll(directive.selector)).forEach(item=> {
          var id = item.getAttribute('id'), level = item.getAttribute('data-level');
          if (id && level) {
            directive.cache.push({
              target: id.replace(/^#/, ''),
              level: level,
              offset: getOffsetTop(item)
            });
          }
        });
        directive.vm.$get(directive.expression).call(directive, directive.cache)
      });
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
      debugger;
      this.scrollEventTarget.removeEventListener('scroll', this.scrollListener);
    }
  })
}();
