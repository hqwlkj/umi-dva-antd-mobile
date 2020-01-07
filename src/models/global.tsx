// @ts-ignore
import { query } from '@/services/api';
import { Effect } from './connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';

export interface GlobalModelState {
  chapterData: any[];
}
export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveChapterData: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    chapterData: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'saveChapterData',
        payload: response,
      });
    },
  },
  reducers: {
    saveChapterData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: search });
        }
      });
    },
  },
};

export default GlobalModel;
