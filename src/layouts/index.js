import React, { Component } from 'react';
import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import SimpleLayout from '@/layouts/SimpleLayout';
import DocumentTitle from 'react-document-title';
import { Layout, Icon } from 'antd';
import { enquireScreen } from 'enquire-js';
import { ContainerQuery } from 'react-container-query';
import { getMenuData } from '@/common/menu';
import SiderMenu from '@/components/SiderMenu';
import classNames from 'classnames';
import styles from './index.less';
import openPages from '@/common/openPages';
import Redirect from 'umi/redirect';
import MainHeaderLayout from './MainHeaderLayout';
const { Header, Content } = Layout;

let isMobile;
enquireScreen(b => {
    isMobile = b;
});

const query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200
    }
};

class MainLayout extends Component {
    state = {
        isMobile
    };

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps');
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate');
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log('componentWillUpdate');
    }

    componentWillMount() {
        // console.log('componentWillMount');
    }

    componentDidMount() {
        // console.log('componentDidMount');
        enquireScreen(mobile => {
            this.setState({
                isMobile: mobile,
            });
        });
    }

    setPageTitle = (pageTitle)=> {
        return pageTitle ? pageTitle + ' - 搜配' : '审核后台 - 搜配';
    };

    handleMenuCollapse = collapsed => {
        this.props.dispatch({
            type: 'main/changeMainLayoutCollapsed',
            payload: collapsed,
        });
    };


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
        const { children, collapsed, location } = this.props;
        const {pageTitle, breadcrumbData} = this.getBreadcrumbData();
        if(openPages.includes(location.pathname)){
            // 非mainLayouts布局的页面
            return (
                <div><SimpleLayout {...this.props} pageTitle={this.setPageTitle(pageTitle)} breadcrumbData={breadcrumbData}>{ children }</SimpleLayout></div>
            );
        }

        if(location.pathname === '/') {
            return <Redirect to="/standardmodel/review" />;
        }
        
        const { isMobile } = this.state;
        let LayoutStyle = !isMobile ? {'marginLeft': collapsed ? 80 : 200} : {};
        const layout = <Layout>
            {/* 侧边栏 */}
            <SiderMenu menuData={getMenuData()} collapsed={collapsed} location={location} isMobile={isMobile} onCollapse={this.handleMenuCollapse}/>
            {/* 右侧布局 */}
            <Layout style={LayoutStyle}>
                {/* Header */}
                <Header className={styles.header}>
                    {isMobile && 
                    <span>
                        <span className={classNames(styles['header_logo'], 'iconfont icon-lingxing')}></span>
                        <span className={styles.divider}></span>
                    </span>
                    }
                    
                    <Icon className={classNames(styles.trigger, 'cur')} type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={()=>this.handleMenuCollapse(!collapsed)} />
                </Header>
                {/* Content */}
                <MainHeaderLayout pageTitle={pageTitle} breadcrumbData={breadcrumbData}>
                    <Content className={styles.content}>
                        {children}
                    </Content>
                </MainHeaderLayout>
            </Layout>
        </Layout>;
        return (
            <DocumentTitle title={this.setPageTitle(pageTitle)}>
                <ContainerQuery query={query}>
                    {params =>(
                        <div className={classNames(params)}>{layout}</div>
                    )}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

const mapStateToProps = ({ main }) => ({ collapsed: main.collapsed });
export default withRouter(connect(mapStateToProps)(MainLayout));
