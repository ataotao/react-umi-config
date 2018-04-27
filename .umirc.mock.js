// import standardmodel_review from './mock/standardmodel_review';

// export default {
//     'GET /mock/standardmodel/review': (req, res) => {
//         res.send(standardmodel_review);
//     },
//     // // 支持值为 Object 和 Array
//     // 'GET /mock/info/mine': (req, res) => {
//     //     res.send(info_mine);
//     // },

//     // // GET POST 可省略
//     // '/mock/users/1': { id: 1 },

//     // // 支持自定义函数，API 参考 express@4
//     // 'POST /mock/users/create': (req, res) => {
//     //     res.end('OK');
//     // }
// };

const mock = {}
require('fs').readdirSync(require('path').join(__dirname + '/mock')).forEach(function(file) {
	Object.assign(mock, require('./mock/' + file))
});
module.exports = mock;