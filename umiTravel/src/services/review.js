// 评论service

export default function (api) {
  return {
    //调用链查询接口
    createReview: query => api.post('/reviews/createReview', query),
    getCommentList: query => api.post('/reviews/getCommentList', query),

  }
}
