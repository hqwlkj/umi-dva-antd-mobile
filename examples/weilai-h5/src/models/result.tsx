// @ts-ignore
import { saveResult } from '@/services/api';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import LS from 'parsec-ls';

export default {
  namespace: 'result',
  state: {
    data: [],
    score: -1,
    gender: -1,
    resultData: {},
    district: [],
  },
  effects: {
    * fetch(_, { put }) {
      if (LS.getObj('answers') === null || LS.get('gender') === null) {
        yield put(routerRedux.replace('/'));
        return;
      }
      const answers = LS.getObj('answers');
      const gender = LS.getObj('gender');
      let score = 0;
      answers.map(answer => (score += answer.score));
      yield put({
        type: 'saveResult',
        payload: {
          gender,
          score,
        },
      });
    },
    * submit({ payload, callback }, { put, call }) {
      Toast.loading('提交中...');
      const response = yield call(saveResult, payload);
      yield put({
        type: 'saveData',
        payload: response.result || {},
      });
      Toast.hide();
      if (callback) {
        callback(response);
      }

      yield put(routerRedux.replace('/result'));
    },
  },
  reducers: {
    saveResult(state, { payload }: { payload: any }): any {
      return {
        ...state,
        ...payload,
      };
    },
    saveData(state, { payload }: { payload: any }): any {
      return {
        ...state,
        resultData: payload,
      };
    },
    getDistrictData(state) {
      const district: Array<{ value: string; label: string; children: Array<{ value: string; label: string; }> }> = [
        { label: '北京', value: '北京', children: [{ label: '北京', value: '北京' }] },
        { label: '天津', value: '天津', children: [{ label: '天津', value: '天津' }] },
        { label: '河北省', value: '河北省', children: [{ label: '石家庄', value: '石家庄' }] },
        { label: '山西省', value: '山西省', children: [{ label: '太原', value: '太原' }] },
        { label: '内蒙古自治区', value: '内蒙古自治区', children: [{ label: '呼和浩特', value: '呼和浩特' }] },
        { label: '辽宁省', value: '辽宁省', children: [{ label: '大连', value: '大连' }, { label: '沈阳', value: '沈阳' }] },
        { label: '吉林省', value: '吉林省', children: [{ label: '长春', value: '长春' }] },
        { label: '黑龙江省', value: '黑龙江省', children: [{ label: '哈尔滨', value: '哈尔滨' }] },
        { label: '上海', value: '上海', children: [{ label: '上海', value: '上海' }] },
        {
          label: '江苏省',
          value: '江苏省',
          children: [{ label: '苏州', value: '苏州' }, { label: '南京', value: '南京' }, { label: '徐州', value: '徐州' }],
        },
        {
          label: '浙江省',
          value: '浙江省',
          children: [{ label: '杭州', value: '杭州' }, { label: '宁波', value: '宁波' }, {
            label: '金华',
            value: '金华',
          }, { label: '温州', value: '温州' }],
        },
        { label: '安徽省', value: '安徽省', children: [{ label: '合肥', value: '合肥' }, { label: '黄山', value: '黄山' }] },
        { label: '福建省', value: '福建省', children: [{ label: '福州', value: '福州' }, { label: '厦门', value: '厦门' }] },
        { label: '江西省', value: '江西省', children: [{ label: '南昌', value: '南昌' }] },
        {
          label: '山东省',
          value: '山东省',
          children: [{ label: '济南', value: '济南' }, { label: '青岛', value: '青岛' }, { label: '烟台', value: '烟台' }],
        },
        { label: '河南省', value: '河南省', children: [{ label: '郑州', value: '郑州' }, { label: '许昌', value: '许昌' }] },
        { label: '湖北省', value: '湖北省', children: [{ label: '武汉', value: '武汉' }, { label: '宜昌', value: '宜昌' }] },
        { label: '湖南省', value: '湖南省', children: [{ label: '长沙', value: '长沙' }] },
        {
          label: '广东省',
          value: '广东省',
          children: [{ label: '深圳', value: '深圳' }, { label: '广州', value: '广州' }, {
            label: '珠海',
            value: '珠海',
          }, { label: '汕头', value: '汕头' }],
        },
        { label: '广西壮族自治区', value: '广西壮族自治区', children: [{ label: '南宁', value: '南宁' }] },
        { label: '海南省', value: '海南省', children: [{ label: '海南省', value: '海南省' }] },
        { label: '重庆', value: '重庆', children: [{ label: '重庆', value: '重庆' }] },
        { label: '四川省', value: '四川省', children: [{ label: '成都', value: '成都' }] },
        { label: '贵州省', value: '贵州省', children: [{ label: '贵阳', value: '贵阳' }] },
        { label: '云南省', value: '云南省', children: [{ label: '昆明', value: '昆明' }] },
        { label: '西藏自治区', value: '西藏自治区', children: [{ label: '拉萨', value: '拉萨' }] },
        { label: '陕西省', value: '陕西省', children: [{ label: '西安', value: '西安' }] },
        { label: '甘肃省', value: '甘肃省', children: [{ label: '兰州', value: '兰州' }] },
        { label: '青海省', value: '青海省', children: [{ label: '西宁', value: '西宁' }] },
        { label: '宁夏回族自治区', value: '宁夏回族自治区', children: [{ label: '银川', value: '银川' }] },
        { label: '新疆维吾尔自治区', value: '新疆维吾尔自治区', children: [{ label: '乌鲁木齐', value: '乌鲁木齐' }] },
      ];
      return {
        ...state,
        district,
      };
    },
  },
};
