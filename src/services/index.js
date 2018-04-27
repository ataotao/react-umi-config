import { post, get } from 'utils/http';
import * as api from './api';

/******************
 * get
 ******************/
/**
 * 标准车型列表 {params:{ }}
 */
export const standardmodel_review = ({ params }) => {
    return get(api.standardmodel_review, {params});
};
    

/******************
 * post
 ******************/
/**
 * 登录 {data:{ account, password }}
 */
export const login = ({ data }) =>
    post(api.login, {data});

/**
 * 导入车型数据
 */
export const carmodel_import_liyang = ({ data }) => {
    return post(api.carmodel_import_liyang, {data});
};

