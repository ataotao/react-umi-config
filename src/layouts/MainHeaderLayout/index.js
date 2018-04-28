import React, { Component } from 'react';
import { Icon, Breadcrumb } from 'antd';
import styles from './index.less';
import NavLink from 'umi/navlink';
import { getMenuData } from '@/common/menu';

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

    // 构造面包屑数据
    getBreadcrumbData = () => {
        const {location} = this.props;
        const menuData = getMenuData();
        const pathnameArr = location.pathname.split('/');
        // 首页 标准车型审核 标准车型
        let breadcrumbData = this.getMeunName()(menuData, pathnameArr);
        return {
            pageTitle: breadcrumbData[breadcrumbData.length - 1].breadcrumbName,
            breadcrumbData
        };
        
    };

    // 获取menuname
    getMeunName = () => {
        let breadcrumbData = [];
        return function getData(menuData, pathnameArr) {
            if(breadcrumbData.length === 0) {
                breadcrumbData.push({
                    breadcrumbName: '首页',
                    path: '/'
                });
            }
            for (let i = 1; i < pathnameArr.length; i++) {
                const pathname = pathnameArr[i];
                for (let j = 0; j < menuData.length; j++) {
                    const menu = menuData[j];
                    if(menu.path.endsWith(pathname)) {
                        breadcrumbData.push({
                            breadcrumbName: menu.name,
                            path: menu.path
                        });
                        if(menu.children && menu.children.length) {
                            getData(menu.children, pathnameArr);
                        }
                        break;
                    }
                }
                
            }
            return breadcrumbData;
        };
        
    };

    render() {
        const { children } = this.props;
        const {pageTitle, breadcrumbData} = this.getBreadcrumbData();
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