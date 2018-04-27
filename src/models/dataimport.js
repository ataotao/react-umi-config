import { request } from 'utils/http';

export default {
    namespace: 'dataimport',

    state: {

    },

    effects: {
        *fetchImport({ payload: data }, { call, put }) {
            return yield call(request, { fnName: 'carmodel_import_liyang', data });
            // yield put({ type: 'changeLoginStatus', status });
        }
    },
    reducers: {

    },

    subscriptions: {

    }
};
