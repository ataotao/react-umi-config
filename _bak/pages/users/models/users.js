import * as usersService from '../services/users';

export default {
    namespace: 'users',
    // 初始值
    state: {
        list: [],
        total: null,
        page: null
    },
    // 合并数据集合, 以 key/value 格式定义 reducer。用于处理同步操作，唯一可以修改 state 的地方。由 action 触发。
    reducers: {
        save(state, { payload: { data: list, total, page } }) {
            return { ...state, list, total, page };
        }
    },
    // 异步操作, 
    // 以 key/value 格式定义 effect。用于处理异步操作和业务逻辑，不直接修改 state。由 action 触发，可以触发 action，可以和服务器交互，可以获取全局 state 的数据等等。
    /**
     * select: 从state中查找所需的子state属性。该方法参数为state, 返回一个子state对象。
     * put: 创建一条effect信息, 指示middleware发起一个action到Store. put({type: ‘xxxx’, payload: {}})
     * call: 创建一条effect信息，指示middleware使用args作为fn的参数执行，例如call(services.create, payload)
     */
    effects: {
        *fetch({ payload: { page = 1 } }, { call, put }) {
            // 调用 usersService.fetch
            const { data, headers } = yield call(usersService.fetch, { page });
            // 成功后触发 `save` action 保存到 state
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10)
                }
            });
        },
        *remove({ payload: id }, { call, put, select }) {
            yield call(usersService.remove, id);
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *patch({ payload: { id, values } }, { call, put, select }) {
            yield call(usersService.patch, id, values);
            const page = yield select(state => state.users.page);
            yield put({ type: 'fetch', payload: { page } });
        },
        *create({ payload: values }, { call, put, select }) {
            yield call(usersService.create, values);
            const page = yield select(state => state.users.page);
            yield put({ type: 'remove', payload: { page } });
        }
    },
    // 从 源 获取数据的方法
    // Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。
    // 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
    subscriptions: {
        setup({ dispatch, history }, done) {
            // 监听 history 变化，当进入 `/` 时触发 `fetch` action
            return history.listen(({ pathname, query }) => {
                if (pathname === '/users') {
                    dispatch({ type: 'fetch', payload: query });
                }
            });
        }
    }
};
