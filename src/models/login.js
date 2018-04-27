import { request } from 'utils/http';

export default {
    namespace: 'login',

    state: {

    },

    effects: {
        *fetchLogin({ payload: data }, { call, put }) {
            return yield call(request, { fnName: 'login', data });
            // yield put({ type: 'changeLoginStatus', status });
        }
    },

    reducers: {

    },

    subscriptions: {

    }
};
