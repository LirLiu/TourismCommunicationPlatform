
export default function (api) {
  return {
    //调用链查询接口
    adminSend: query => api.post('/admin/adminSend', query),
    getAdminInfo: query => api.post('/admin/getAdminInfo', query),
    postManage: query => api.post('/admin/postManage', query),
    reviewManage: query => api.post('/admin/reviewManage', query),
    modifyAdmin: query => api.post('/admin/modifyAdmin', query),
    uploadAvatar: query => api.post('/admin/uploadAvatar', query),
    adminManage: query => api.post('/admin/adminManage', query),

  }
}
