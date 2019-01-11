import { queryPlate, queryQuestions, queryTestPapers, saveTestResult } from '@/services/api';
import { routerRedux } from 'dva/router';
import LS from 'parsec-ls';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'global',
  state: {},
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(queryPlate, payload);
      yield put({
        type: 'saveChapterData',
        payload: response.result || [],
      });
      if (callback) callback(response);
    },
    *fetchQuestions({ payload, callback }, { call, put, select }) {
      const { chapterData } = yield select(state => state.global);
      const response = yield call(queryQuestions, payload);
      yield put({
        type: 'saveQuestionsData',
        payload: {
          questions: response.result || [],
          chapterData,
        },
      });
      if (callback) callback(response);
      if (payload.type !== 'follow') {
        yield put(routerRedux.replace(`/paper/${payload.type}`));
      }
    },
    *fetchTestPapers({ payload, callback }, { call, put, select }) {
      Toast.loading('试卷生成中...');
      const { chapterData } = yield select(state => state.global);
      const response = yield call(queryTestPapers, payload);
      yield put({
        type: 'savePaperData',
        payload: {
          ...response.result,
          chapterData,
        },
      });
      Toast.hide();
      if (callback) callback(response, true);
    },
    *submit({ payload, callback }, { call, put }) {
      Toast.loading('提交试卷中...', 5 * 1000);
      const response = yield call(saveTestResult, payload);
      yield put({
        type: 'saveResult',
        payload: response.result || {},
      });
      Toast.hide();
      if (callback) callback(response);
      yield put(routerRedux.replace('/result'));
    },
    *startTheExam({ payload }, { put, select }) {
      const { questions, paper, chapterData } = yield select(state => state.global);
      yield put({
        type: 'savePaperData',
        payload: {
          questions,
          paper,
          chapterData,
        },
      });
      yield put(routerRedux.replace(`/paper/${payload.type}`));
    },
  },
  reducers: {
    saveChapterData(state, { payload }) {
      return {
        ...state,
        chapterData: payload,
      };
    },
    saveQuestionsData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    savePaperData(state, { payload }) {
      return {
        ...state,
        questions: payload.questions,
        paper: payload.paper,
      };
    },
    saveResult(state, { payload }) {
      let answers = [];
      let questions = [];
      if (LS.getObj('drip-exam') !== null) {
        const dripExam = LS.getObj('drip-exam');
        answers = dripExam.answers || [];
        questions = dripExam.questions || [];
      }
      const wrongIds = LS.getObj('wrong_ids');
      LS.setObj('drip-exam-result', {
        answers,
        questions,
        result: {
          ...payload,
          wrong_ids: wrongIds,
        },
      });
      LS.remove('drip-exam');
      LS.remove('wrong_ids');
      return {
        ...state,
        resultData: payload,
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
