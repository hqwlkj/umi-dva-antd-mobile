import { query } from '@/services/api';

export default {
  namespace: 'global',
  state: {},
  effects: {
    * fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response.result || [],
      });
      if (callback) callback(response);
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        chapterData: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
