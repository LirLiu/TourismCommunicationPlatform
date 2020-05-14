
export default function (api) {
  return {
    //调用链查询接口
    getRecommendList: query => api.get('/posts/getRecommendList', query),
    getPostList: query => api.post('/posts/getPostList', query),
    getSearchList: query => api.post('/posts/getSearchList', query),
    getSearchPost: query => api.post('/posts/getSearchPost', query),
    getSearchTags: query => api.post('/posts/getSearchTags', query),
    getZeroAnswer: query => api.get('/posts/getZeroAnswer', query),
    getPostDetail: query => api.post('/posts/getPostDetail', query),
    postCreate: query => api.post('/posts/postCreate', query),
    getOtherList: query => api.post('/posts/getOtherList', query),
    getViewsIncrease: query => api.post('/posts/getViewsIncrease', query),
  }
}
