import { stringify } from 'qs';
import request from '@/utils/request';

export async function query(params) {
  return request(`/api/app/chapter?${stringify(params)}`);
}
