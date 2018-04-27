import React, { Component } from 'react';
import { Icon, Breadcrumb } from 'antd';
import styles from './index.less';
import NavLink from 'umi/navlink';
import pageTitles from '@/common/pageTitles';

const MainBreadcrumb = props => {
    const { breadcrumbData } = props;
    return (
        <div className={styles.pageBreadcrumb}>
            <Breadcrumb>
                {
                    breadcrumbData.map((item, index) => {
                        return (
                            <Breadcrumb.Item key={index}>
                                {item.path == '' ?
                                    <span>{item.path === '/' && <Icon type="home" />} {item.name}</span> :
                                    <NavLink to={item.path}>{item.path === '/' && <Icon type="home" />}{item.name}</NavLink>
                                }
                            </Breadcrumb.Item>
                        );
                    })
                }
            </Breadcrumb>
        </div>
    );
};

class MainHeader extends Component {

    // 构造面包屑数据
    getBreadcrumbData = (pageLink) => {
        const {location} = this.props;
        let pathNameArr =  location.pathname.split('/');
        let pageStr = '/' + pathNameArr[pathNameArr.length - 1];
        let pageTitle = pageTitles[pageStr];
        let breadcrumbData = pathNameArr.map((item, index) => {
            let nameKey = '/' + pathNameArr[index];
            let name = pageTitles[nameKey];
            let path = pageLink[index] || '';
            return {name, path };
        });
        return {pageTitle, breadcrumbData};
    };

    render() {
        const { children, pageLink} = this.props;
        const {pageTitle, breadcrumbData} = this.getBreadcrumbData(pageLink);
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


export default MainHeader;


