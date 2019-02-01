// @ts-ignore
import request from '@/utils/request';
import { stringify } from 'qs';

export async function query(params) {
  return request(`/api/chapter?${stringify(params)}`);
}

export async function saveResult(params) {
  return request('https://games.parsec.com.cn/game-0012-stg/app/weilaiqiche/form', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
