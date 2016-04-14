/**
 * Created by Nomand on 3/7/16.
 */
export const addClass = (dom, name) => {
  dom.classList.add(name);
  return dom;
};
export const removeClass = (dom, name) => {
  dom.classList.remove(name);
  return dom;
};

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

export const insertBefore = (el, target) => {
  target.parentNode.insertBefore(el, target)
};


/**
 * Insert el after target
 *
 * @param {Element} el
 * @param {Element} target
 */

export const insertAfter = (el, target)=> {
  if (target.nextSibling) {
    insertBefore(el, target.nextSibling)
  } else {
    target.parentNode.appendChild(el)
  }
};

export const contains = (root, node) => {
  while (node) {
    if (node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
};
