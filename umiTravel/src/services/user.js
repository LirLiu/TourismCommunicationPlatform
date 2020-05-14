
export default function (api) {
  return {
    //调用链查询接口
    sendRegister: query => api.post('/user/register', query),
    sendLogin: query => api.post('/user/login', query),
    getUserInfo: query => api.post('/user/getUserInfo', query),
    getUserPost: query => api.post('/user/getUserPost', query),
    getUserReview: query => api.post('/user/getUserReview', query),
    deleteUserElse: query => api.post('/user/deleteUserElse', query),
    modifyUser: query => api.post('/user/modifyUser', query),
    upload: query => api.post('/user/upload', query),

  }
}
