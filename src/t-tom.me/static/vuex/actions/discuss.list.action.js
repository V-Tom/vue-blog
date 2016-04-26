'use strict';
import {discussList} from '../types'
import {ReplyApi} from '../../api'

import Notification from '../../components/notification'
import {emojiDecoding} from '../../libs/utils/tools'

//获取文章下的评论
export const getReplyList = ({dispatch,router,_vm}, articleId, page, limit)=> {
  ReplyApi.getReply(limit, page, articleId).then(result=> {
    if (result.ok) {
      result = result.data;
      result.data.forEach(function (item) {
        if (item.replyUser && item.replyUser.content) {
          item.replyUser.content = emojiDecoding(item.replyUser.content);
        }
      });
      if (result.success) {
        dispatch(discussList.GET_ARTICLE_REPLY_LIST, result.data, articleId)
      } else {
        Notification.error('啊哦~获取评论列表失败')
      }
    } else {
      Notification.error('啊哦~获取评论列表失败')
    }
  }).catch(ex=> {
    Notification.error('啊哦~获取评论列表发生错误:' + ex.data.message)
  })
};

export const addANewReply = ({dispatch}, data)=> {
  dispatch(discussList.ADD_A_NEW_REPLY, data)
};
