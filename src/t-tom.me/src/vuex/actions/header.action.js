'use strict';
import {header} from '../types'

export const showHeader = ({dispatch,router,_vm})=> {
  dispatch(header.SHOW_HEADER)
};

export const hideHeader = ({dispatch,router,_vm})=> {
  dispatch(header.HIDE_HEADER)
};

//设置header scroll limit
export const setHeaderLimit = ({dispatch,router,_vm}, limit)=> {
  dispatch(header.SET_HEADER_LIMIT, limit)
};


