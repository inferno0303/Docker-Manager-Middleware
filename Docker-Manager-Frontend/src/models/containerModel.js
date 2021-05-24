import * as requestService from '../services/requestService';
import { isArray, updateKeyToObjArray } from '@/utils/formatData';
import { isResp200 } from '@/utils/checkResp';
import { message } from 'antd';

export default {
  namespace: 'containerModel',
  state: {
    containerList: [],
  },
  reducers: {

    containerList(state, {payload}) {
      return { ...state, containerList: payload }
    }

  },
  effects: {

    // 获取容器列表
    *getContainerList({ payload }, { call, put }) {
      try {
        const resp = yield call(requestService.getContainerList, payload);
        if (isResp200(resp) && isArray(resp.data.data)) {
          const ret = updateKeyToObjArray(resp);
          yield put({ type: 'containerList', payload: ret });
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
