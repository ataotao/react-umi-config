import React, { createElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';
import config from './typeConfig';
import styles from './index.less';

/**
 * @param {*} 
 * type : 页面类型
 * title: 标题
 * desc: 说明
 * img: 背景图
 * actions: 配置此属性时默认的『返回首页』按钮不生效
 * linkElement: 定义链接的元素，默认为 `a`
 */

const Exception = ({ className, linkElement = 'a', type, title, desc, img, actions, ...rest }) => {
    const pageType = type in config ? type : '404';
    const clsString = classNames(styles.exception, className);
    return (
        <div className={clsString} {...rest}>
            <div className={styles.imgBlock}>
                <div className={styles.imgEle} style={{backgroundImage: `url(${img || config[pageType].img})`}} />
            </div>
            <div className={styles.content}>
                <h1>{title || config[pageType].title}</h1>
                <div className={styles.desc}>
                    {desc || config[pageType].desc}
                </div>
                <div className={styles.actions}>
                    {actions ||
                        createElement(
                            linkElement,
                            { to: '/', href: '/'},
                            <Button type="primary">返回首页</Button>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Exception;