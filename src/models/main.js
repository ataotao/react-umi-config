export default {
    namespace: 'main',

    state: {
        collapsed: false
    },

    effects: {
        // *fetch({ payload }, { call, put }) {
        //     // eslint-disable-line
        //     yield put({ type: 'save' });
        // }
    },

    reducers: {
        changeMainLayoutCollapsed(state, { payload }) {
            return {
                ...state,
                collapsed: payload
            };
        }
    },
    
    subscriptions: {
        // setup({ history, dispatch }) {
        //     // 监听 history 变化，当进入 `/` 时触发 `load` action
        //     return history.listen(({ pathname }) => {
        //         if (pathname === '/') {
        //             dispatch({ type: 'load' });
        //         }
        //     });
        // }
    }
};
