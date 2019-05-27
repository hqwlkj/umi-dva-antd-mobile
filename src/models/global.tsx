// @ts-ignore
import { query } from '@/services/api';

export default {
  namespace: 'global',
  state: {
    chapterData: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },
  reducers: {
    save(state) {
      return {
        ...state,
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
