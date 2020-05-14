import services from '@/services/index';

const { user: userService } = services;

export default {
  namespace: 'user',
  state: {
    userInfo: {},
    userPost: [],
    userReview: [],
  },
  reducers: {
    showUserInfo(state, action) {
      const { payload: { res } } = action;
      state.userInfo = res.list[0];
    },
    showUserPost(state, action) {
      const { payload: { res } } = action;
      state.userPost = res.list;
    },
    showUserReview(state, action) {
      const { payload: { res } } = action;
      state.userReview = res.list;
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {

  //     history.listen(({ pathname, query }) => {
  //       if (pathname === '/') {
  //         dispatch({
  //           type: 'getRecommendList',
  //         });
  //       }
  //     });
  //   },
  // },
  effects: {
    * sendRegister({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(userService.sendRegister, { ...payload.data });
      console.log(res, '打印sendRegister接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * sendLogin({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(userService.sendLogin, { ...payload.data });
      console.log(res, '打印sendLogin接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * getUserInfo({ payload }, { call, put }) {
      const res = yield call(userService.getUserInfo, { ...payload });
      console.log(res, '打印getUserInfo接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showUserInfo',
        payload: {
          res,
        },
      });
    },
    * getUserPost({ payload }, { call, put }) {
      const res = yield call(userService.getUserPost, { ...payload });
      console.log(res, '打印getUserPost接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showUserPost',
        payload: {
          res,
        },
      });
    },
    * getUserReview({ payload }, { call, put }) {
      const res = yield call(userService.getUserReview, { ...payload });
      console.log(res, '打印getUserReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showUserReview',
        payload: {
          res,
        },
      });
    },
    * deleteUserElse({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(userService.deleteUserElse, { ...payload.data });
      console.log(res, '打印deleteUserElse接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * modifyUser({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(userService.modifyUser, { ...payload.data });
      console.log(res, '打印modifyUser接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * upload({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(userService.upload, { ...payload.data });
      console.log(res, '打印upload接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },

  },
};
