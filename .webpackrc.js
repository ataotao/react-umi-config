import path from 'path';

export default {
    alias: {
        '@': path.resolve(__dirname, './src/'),
        pages: path.resolve(__dirname, './src/pages/'),
        utils: path.resolve(__dirname, './src/utils/')
    },
    theme: './theme.config.js',
    proxy: {
        '/api': {
            target: 'http://dev.portal.sopei.cn',
            changeOrigin: true,
            pathRewrite: { '^/api': '/api' }
        }
    }
};
