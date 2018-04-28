import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
import classNames from 'classnames';
import styles from './index.less';
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

const MenuLogo = props => {
    const { collapsed } = props;
    return (
        <div className={styles['menu_logo_box']}>
            <span className={classNames('iconfont', styles[collapsed ? 'meun_logo_mini' : 'meun_logo'])}></span>
        </div>
    );
};

// 转化路径
const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
        return path;
    } else {
        return `/${path || ''}`.replace(/\/+/g, '/');
    }
};

// 获取子菜单
const getSubMenuItems = item => {
    return (
        <Item key={item.path}>
            <Link to={conversionPath(item.path)}>
                {!item.children && item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
            </Link>
        </Item>
    );
};

// 获取一级菜单
const getNavMenuItems = menusData => {
    if (!menusData) {
        return [];
    }

    return menusData.map(item => {
        return !item.children ? (
            getSubMenuItems(item)
        ) : (
            <SubMenu
                key={item.path}
                title={
                    <span>
                        <Icon type="mail" />
                        <span>{item.name}</span>
                    </span>
                }
            >
                {item.children.map(sub => getSubMenuItems(sub))}
            </SubMenu>
        );
    });
};

class SiderMenu extends Component {
    constructor(props) {
        super(props);
        this.menus = props.menuData;
        this.state = {};
    }

    // 初始化Menu默认选项
    setDefaultMenu = pathname => {       
        const condition = pathname === '/';
        let defaultOpenKeys = condition
            ? ['/standardmodel']
            : ['/' + pathname.split('/')[1]];
        let defaultSelectedKeys = condition
            ? ['/standardmodel/review']
            : [pathname];
        let keysArr = defaultSelectedKeys[0].split('/');
        if(keysArr.length > 3) {
            defaultSelectedKeys = [keysArr.filter((item, index) => index < 3).join('/')];
        }
        return {
            defaultOpenKeys,
            defaultSelectedKeys
        };
    };
    render() {
        const props = this.props;
        const { collapsed, onCollapse, cls } = this.props;
        const { defaultOpenKeys, defaultSelectedKeys } = this.setDefaultMenu(
            this.props.location.pathname
        );
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={onCollapse}
                width={200}
                className={cls}
            >
                <MenuLogo {...props} />
                <Menu
                    theme="dark"
                    mode="inline"
                    inlineCollapsed={props.collapsed}
                    defaultOpenKeys={defaultOpenKeys}
                    defaultSelectedKeys={defaultSelectedKeys}
                    style={{ padding: '16px 0', width: '100%' }}
                >
                    {getNavMenuItems(this.menus)}
                </Menu>
            </Sider>
        );
    }
}

export default SiderMenu;
