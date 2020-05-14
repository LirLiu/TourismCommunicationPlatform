import services from '@/services/index';

const { review: reviewService } = services;

export default {
  namespace: 'review',
  state: {
    commentList: []
  },
  reducers: {
    showCommentList(state, action) {
      const { payload: { res } } = action;
      state.commentList = res.list;
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
    * createReview({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(reviewService.createReview, { ...payload.data });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
      // yield put({
      //   type: 'showCreateReview',
      //   payload: {
      //     res,
      //   },
      // });
    },
    * getCommentList({ payload }, { call, put }) {
      const res = yield call(reviewService.getCommentList, { ...payload });
      console.log(res, '打印createReview接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showCommentList',
        payload: {
          res,
        },
      });
    },

  },
};
