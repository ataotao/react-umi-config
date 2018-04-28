import React, { Component } from 'react';
import { Icon, Breadcrumb } from 'antd';
import styles from './index.less';
import NavLink from 'umi/navlink';

function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1 || routes.indexOf(route) === 1;
    return last ? 
        <span>{route.breadcrumbName}</span> :
        <NavLink to={paths.join('/')} key={route.path}>
            {route.path === '/' && <Icon type="home" />} {route.breadcrumbName}
        </NavLink>;
}

const MainBreadcrumb = props => {
    const { breadcrumbData } = props;
    return (
        <div className={styles.pageBreadcrumb}>
            <Breadcrumb itemRender={itemRender} routes={breadcrumbData} />
        </div>
    );
};

class MainHeaderLayout extends Component {
    render() {
        const { children, pageTitle, breadcrumbData } = this.props;
        return (
            <div>
                <div className={styles.pageHeader}>
                    {/* 面包屑 */}
                    <MainBreadcrumb breadcrumbData={breadcrumbData} />
                    {/* 面包屑标题 */}
                    <h3 className={styles.pageTitle}>{pageTitle}</h3>
                </div>
                {children ? (
                    <div className={styles.content}>{children}</div>
                ) : null}
            </div>
        );
    }
}
export default MainHeaderLayout;