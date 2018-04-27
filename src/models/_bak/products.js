// 模拟sleep延迟
export const sleep = (timeountMS) => new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
});

export default {
    namespace: 'products',
    state: [{ name: 'dva', id: 1 }, { name: 'antd', id: 2 }],
    reducers: {
        delete(state, { payload: id }) {
            return state.filter(item => item.id !== id);
        }
    },
    effects: {
        *fetch({ payload: id }, { call, put }) {
            yield sleep(500);
            yield put({ type: 'delete', payload: id });
        }
    },
};
