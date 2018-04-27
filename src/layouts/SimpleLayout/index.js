import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import pageTitles from '@/common/pageTitles';
import classNames from 'classnames';
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

export default props => {
    const { location, children } = props;
    const { pathname } = location;
    const getPageTitle = ()=> {
        let title = '搜配 - 审核后台';
        if(pageTitles[pathname]) {
            title = `${pageTitles[pathname]} - 搜配`;
        }
        return title;
    };
    
    return (
        <DocumentTitle title={getPageTitle()}>
            <ContainerQuery query={query}>
                {params =>(
                    <div className={classNames(params)}>{children}</div>
                )}
            </ContainerQuery>
        </DocumentTitle>
    );
};