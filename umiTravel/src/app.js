import createHistory from 'history/createBrowserHistory';

export const dva = {
  history: createHistory(),
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};
