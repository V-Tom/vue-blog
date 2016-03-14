import Notification from './notification.vue'
import Vue from 'vue'

const notice = function (content, duration, type, onclose) {
  let iconClass = ({
    'info': 'info',
    'success': 'success',
    'error': 'error'
  })[type];

  const container = document.createElement('div');
  container.innerHTML = '<Notification :text="text" :show="show" :icon-class="iconClass"></Notification>';
  document.body.appendChild(container);

  let notification = new Vue({
    el: container,
    data: {
      show: true,
      text: content,
      iconClass: iconClass
    },
    components: {Notification}
  }).$children[0];

  duration = duration * 1000 || 1500;

  setTimeout(()=> {

    let ani = container.querySelector('.body');
    ani.addEventListener('animationend', ()=> {
      container.parentNode.removeChild(container);
      notification.$destroy(true);
      onclose && onclose();
    }, false);

    ani.classList.add('slideOutDown');

  }, duration);
};

export default{

  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose)
  },

  success(content, duration, onClose){
    return notice(content, duration, 'success', onClose)
  },

  error(content, duration, onClose){
    return notice(content, duration, 'error', onClose)
  }

}
