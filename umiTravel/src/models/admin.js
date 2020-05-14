import services from '@/services/index';

const { admin: adminService } = services;

export default {
  namespace: 'admin',
  state: {
    adminInfo: {},
    postList: [],
    reviewList: [],
    adminList: [],
  },
  reducers: {
    showAdminInfo(state, action) {
      const { payload: { res } } = action;
      state.adminInfo = res.list[0];
    },
    showPostList(state, action) {
      const { payload: { res } } = action;
      state.postList = res.list;
    },
    showReviewList(state, action) {
      const { payload: { res } } = action;
      state.reviewList = res.list;
    },
    showAdminList(state, action) {
      const { payload: { res } } = action;
      state.adminList = res.list;
    },
  },

  effects: {
    * adminSend({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.adminSend, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据

    },
    * getAdminInfo({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.getAdminInfo, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
      yield put({
        type: 'showAdminInfo',
        payload: {
          res,
        },
      });
    },
    * postManage({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.postManage, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
      yield put({
        type: 'showPostList',
        payload: {
          res,
        },
      });
    },
    * reviewManage({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.reviewManage, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
      yield put({
        type: 'showReviewList',
        payload: {
          res,
        },
      });
    },
    * modifyAdmin({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.modifyAdmin, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * uploadAvatar({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.uploadAvatar, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * adminManage({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(adminService.adminManage, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
      yield put({
        type: 'showAdminList',
        payload: {
          res,
        },
      });
    },

  },
};
