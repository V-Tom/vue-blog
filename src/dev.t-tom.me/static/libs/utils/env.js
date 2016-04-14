/**
 * Created by Nomand on 3/7/16.
 */
export const inBrowser =
  typeof window !== 'undefined' &&
  Object.prototype.toString.call(window) !== '[object Object]'
