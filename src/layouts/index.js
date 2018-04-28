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
import pageTitles from '@/common/pageTitles';
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

    getPageTitle = ()=> {
        const { location } = this.props;
        const { pathname } = location;
        let title = '搜配 - 审核后台';
        let pathNameArr = pathname.split('/');
        let pathStr = '/' + pathNameArr[pathNameArr.length - 1];
        if(pageTitles[pathStr]) {
            title = `${pageTitles[pathStr]} - 搜配`;
        }
        return title;
    };

    handleMenuCollapse = collapsed => {
        this.props.dispatch({
            type: 'main/changeMainLayoutCollapsed',
            payload: collapsed,
        });
    };

    render() {
        const { children, collapsed, location } = this.props;
        if(openPages.includes(location.pathname)){
            // 非mainLayouts布局的页面
            return (
                <div><SimpleLayout {...this.props}>{ children }</SimpleLayout></div>
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
                <MainHeaderLayout {...this.props}>
                    <Content className={styles.content}>
                        {children}
                    </Content>
                </MainHeaderLayout>
            </Layout>
        </Layout>;
        return (
            <DocumentTitle title={this.getPageTitle()}>
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




// import React, { Component } from 'react';
// import { connect } from 'dva';


// import { Route, Switch, Redirect } from 'dva/router';
// import { Layout, Icon } from 'antd';
// import DocumentTitle from 'react-document-title';
// import { enquireScreen } from 'enquire-js';
// import { ContainerQuery } from 'react-container-query';
// import { getMenuData } from '../../common/menu';
// import NotFound from '../../routes/Exception/404';
// import SiderMenu from '../../components/SiderMenu';
// import MainHeaderLayout from '..//MainHeaderLayout';
// import classNames from 'classnames';
// import styles from './index.less';

// const { Header, Content } = Layout;


// class MainLayout extends Component {

//     render() {
//         const props = this.props;
//         console.log(props);
//         if (props.location.path === '/login') {
//             return <BlankLayout>{ {props.children} }</BlankLayout>
//         }
//         return (
//         <div>
//             {/* <Header location={location} />
//             <div className={styles.content}>
//                 <div className={styles.main}>{children}</div>
//             </div> */}
//         </div>
//         );
//     }
// }

// export default withRouter(MainLayout);