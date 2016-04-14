'use strict';
import {loader} from '../types'
export const hideLoader = ({dispatch,router,_vm}, msg)=> {
  dispatch(loader.HIDE_LOADER, msg);
};

export const showLoader = ({dispatch,router,_vm}, msg)=> {
  dispatch(loader.SHOW_LOADER, msg);
};
