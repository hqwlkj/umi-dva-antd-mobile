// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function queryChapter(params) {
  return request(`/api/chapter?${stringify(params)}`);
}

export async function queryQuestions(params) {
  return request(`/api/questions?${stringify(params)}`);
}

export async function queryTestPapers() {
  return request(`/api/test/paper`);
}

export async function saveTestResult(params) {
  return request('/api/test/result', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
