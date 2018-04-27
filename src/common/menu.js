import { isUrl } from '../utils/tools';

const menuData = [
    {
        name: '标准车型审核',
        icon: 'dashboard',
        path: 'standardmodel',
        children: [
            {
                name: '标准车型',
                path: 'review'
            },
            {
                name: '批量任务',
                path: 'batchtask'
            }
        ]
    },
    {
        name: '数据导入',
        icon: 'dashboard',
        path: 'dataimport'
    },
    {
        name: '其他',
        icon: 'dashboard',
        path: 'standardmodel2',
        children: [
            {
                name: 'option 1',
                path: 'option1'
            },
            {
                name: 'option 2',
                path: 'option2'
            }
        ]
    }
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map(item => {
        let { path } = item;
        if (!isUrl(path)) {
            path = parentPath + item.path;
        }
        const result = {
            ...item,
            path
        };
        if (item.children) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`
            );
        }
        return result;
    });
}

export const getMenuData = () => formatter(menuData);

export const rawMenu = [...menuData];
