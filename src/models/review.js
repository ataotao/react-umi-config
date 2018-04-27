import { request } from 'utils/http';

export default {
    namespace: 'review',

    state: {
        tableTitle:[],
        tableList: [],
        total: '0',

    },

    effects: {
        *fetchList({ payload }, { call, put }) {
            const res = yield call(request, { fnName: 'standardmodel_review', params: payload });
            yield put({ type: 'savelist', payload: res });
        }
    },

    reducers: {
        savelist(state, action) {
            let res = {...action.payload};
            if(res.code == 0) {
                let {tableList, tableTitle, total} = {...res.data};
                return { ...state, tableList, tableTitle, total };
            }
            
        }
    },
    
    subscriptions: {

    }
};
