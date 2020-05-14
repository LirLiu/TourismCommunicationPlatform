import services from '@/services/index';

const { post: postService } = services;

export default {
  namespace: 'post',
  state: {
    recommendList: [],
    postList: [],
    zeroList: [],
    postDetail: {},
  },
  reducers: {
    showRecommendList(state, action) {
      const { payload: { res } } = action;
      state.recommendList = res.list;
    },
    showPostList(state, action) {
      const { payload: { res } } = action;
      state.postList = res.list;
    },
    showZeroAnswer(state, action) {
      const { payload: { res } } = action;
      state.zeroList = res.list;
    },
    showPostDetail(state, action) {
      const { payload: { res } } = action;
      state.postDetail = res.list[0];
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {

      history.listen(({ pathname, query }) => {
        // if (pathname === '/faqs') {
        //   dispatch({
        //     type: 'getZeroAnswer',
        //   });
        // }
      });
    },
  },
  effects: {
    * getRecommendList({ payload }, { call, put }) {
      const res = yield call(postService.getRecommendList, { ...payload });
      console.log(res, '打印getRecommendList接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showRecommendList',
        payload: {
          res,
        },
      });
    },
    * getPostList({ payload }, { call, put }) {
      const res = yield call(postService.getPostList, { ...payload });
      console.log(res, '打印getPostList接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showPostList',
        payload: {
          res,
        },
      });
    },
    * getSearchList({ payload }, { call, put }) {
      const res = yield call(postService.getSearchList, { ...payload });
      console.log(res, '打印getArticleListt接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showRecommendList',
        payload: {
          res,
        },
      });
    },
    * getSearchPost({ payload }, { call, put }) {
      const res = yield call(postService.getSearchPost, { ...payload });
      console.log(res, '打印getSearchPost接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showPostList',
        payload: {
          res,
        },
      });
    },
    * getSearchTags({ payload }, { call, put }) {
      const res = yield call(postService.getSearchTags, { ...payload });
      console.log(res, '打印getSearchTags接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showPostList',
        payload: {
          res,
        },
      });
    },
    * getZeroAnswer({ payload }, { call, put }) {
      const res = yield call(postService.getZeroAnswer, { ...payload });
      console.log(res, '打印getZeroAnswer接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showZeroAnswer',
        payload: {
          res,
        },
      });
    },
    * getPostDetail({ payload }, { call, put }) {
      const res = yield call(postService.getPostDetail, { ...payload });
      console.log(res, '打印getZeroAnswer接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showPostDetail',
        payload: {
          res,
        },
      });
    },
    * postCreate({ payload }, { call, put }) {
      const { resolve } = payload;
      const res = yield call(postService.postCreate, { ...payload.data });
      console.log(res, '打印postCreate接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
    * getOtherList({ payload }, { call, put }) {
      const res = yield call(postService.getOtherList, { ...payload });
      console.log(res, '打印getOtherList接口传过来的数据，++++++++++++++++++++++++++++++++');
      yield put({
        type: 'showPostList',
        payload: {
          res,
        },
      });
    },
    * getViewsIncrease({ payload }, { call, put }) {
      const resolve = payload.resolve
      const res = yield call(postService.getViewsIncrease, { ...payload.data });
      console.log(res, '打印getViewsIncrease接口传过来的数据，++++++++++++++++++++++++++++++++');
      !!resolve && resolve(res); // 返回数据
    },
  },
};
