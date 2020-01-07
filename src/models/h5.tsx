// @ts-ignore
import { queryChapter, queryQuestions, queryTestPapers, saveTestResult } from '@/services/h5';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import LS from 'parsec-ls';

export default {
  namespace: 'h5',
  state: {
    chapterData: [],
    questions: [],
    resultData: {
      paperId: 0,
      score: 0,
      time: '00:00',
      wrongTotal: 0,
      isPass: false,
    },
  },
  effects: {
    *fetchChapter({ payload }, { call, put }) {
      const response = yield call(queryChapter, payload);
      yield put({
        type: 'saveChapter',
        payload: response,
      });
    },
    *fetchQuestions({ payload, callback }, { call, put, select }) {
      const { chapterData } = yield select(state => state.global);
      const response = yield call(queryQuestions, payload);
      yield put({
        type: 'saveQuestionsData',
        payload: {
          questions: response,
          chapterData,
        },
      });
      if (callback) {
        callback(response);
      }
      if (payload.type !== 'follow') {
        yield put(routerRedux.replace(`/paper/${payload.type}`));
      }
    },
    *fetchTestPapers({ callback }, { call, put, select }) {
      Toast.loading('试卷生成中...');
      const { chapterData } = yield select(state => state.h5);
      const response = yield call(queryTestPapers);
      yield put({
        type: 'savePaperData',
        payload: {
          ...response,
          chapterData,
        },
      });
      Toast.hide();
      if (callback) {
        callback(response, true);
      }
    },
    *submit({ payload, callback }, { call, put }) {
      Toast.loading('提交试卷中...');
      const response = yield call(saveTestResult, payload);
      yield put({
        type: 'saveResult',
        payload: response.result || {},
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }
      yield put(routerRedux.replace('/result'));
    },
    *startTheExam(_, { put, select }) {
      const { questions, paper, chapterData } = yield select(state => state.h5);
      yield put({
        type: 'savePaperData',
        payload: {
          questions,
          paper,
          chapterData,
        },
      });
      yield put(routerRedux.replace(`/paper/test`));
    },
  },
  reducers: {
    saveChapter(state, { payload }) {
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
      if (LS.getObj('exam-test') !== null) {
        const examTest = LS.getObj('exam-test');
        answers = examTest.answers || [];
        questions = examTest.questions || [];
      }
      const wrongIds = LS.getObj('wrong_ids');
      LS.setObj('exam-test-result', {
        answers,
        questions,
        result: {
          ...payload,
          wrong_ids: wrongIds,
        },
      });
      LS.remove('exam-test');
      LS.remove('wrong_ids');
      return {
        ...state,
        resultData: payload,
      };
    },
  },
};
