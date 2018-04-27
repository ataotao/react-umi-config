import Mock from 'mockjs';
const dataSource = [{
    'num': '@id',
    'brand|1': [ '本田', '奥迪', '大宇', '丰田', '光冈', '雷克萨斯', '铃木', '马自达', '讴歌', '起亚', '日产', '三菱', '双龙', '斯巴鲁', '五十铃', '现代', '英菲尼迪'
    ],
    'factory|1': ['东风本田', '广汽本田', '本田汽车'],
    'model|1': [ 'CR-V', 'CR-V混动', 'UR-V', 'XR-V', '艾力绅', '哥瑞', '杰德', '竞瑞', '思铂睿', '思铂睿Si', '思铂睿混动', '思域', '思域Si'
    ],
    config_level: Mock.Random.cword(3, 4),
    'year|1': ['2010', '2011', '2012', '2013', '2018'],
    emissions: Mock.Random.cword(3, 4),
    'displacement|1': ['2.0', '1.5', '3.0'],
    driving: Mock.Random.cword(3, 4),
    engine_model: Mock.Random.cword(3, 4),
    'data_sources|1': ['搜配', '精友', '力洋'],
    'approval_status|1': ['未审核', '已审核'],
    operating: ''
}];

const columns = [{
    title: '车型编号',
    dataIndex: 'num'
},
{
    title: '品牌',
    dataIndex: 'brand'
},
{
    title: '主机厂',
    dataIndex: 'factory'
},
{
    title: '车型',
    dataIndex: 'model'
},
{
    title: '配置等级',
    dataIndex: 'config_level'
},
{
    title: '年款',
    dataIndex: 'year'
},
{
    title: '排放标准',
    dataIndex: 'emissions'
},
{
    title: '排量',
    dataIndex: 'displacement'
},
{
    title: '驱动方式',
    dataIndex: 'driving'
},
{
    title: '发动机型号',
    dataIndex: 'engine_model'
},
{
    title: '数据来源',
    dataIndex: 'data_sources'
},
{
    title: '审核状态',
    dataIndex: 'approval_status'
},
{
    title: '操作',
    dataIndex: 'operating'
}];

let data = Mock.mock({
    code: '0',
    msg: 'OK',
    data: {
        total: '500',
        'tableList|10': dataSource,
        'tableTitle': columns
    },
    status: 'ok'
});


// export default Mock.mock({
//     'data|3-6': [
//         {
//             id: '@id',
//             name: '@Text',
//             'age|18-32': 1
//         }
//     ]
// });

// var data = Mock.mock({
//     'list|4': [{
//         'id|+1': 1
//     }],
//     name: Mock.Random.cname(),  //随机产生一个中文的姓名
//     addr: Mock.mock('@county(true)'), //随机生成一个地址
//     'age|18-60': 1, //随机生成一个数字 大小在18到60
//     birth: Mock.Random.date(), //随机生成一个日期
//     sex: Mock.Random.integer(0, 1),//随机生成一个整数，0/1 ，根据这个来给“男” “女”
//     email:Mock.mock('@EMAIL()'), //随机生成一个邮箱
//     'moblie|1':['13531544954','13632250649','15820292420','15999905612'], //在数组中随机找一个
//     'num1|1-100.2':1, //1-100 中随机生成一个保留两位小数点
//     'num2|100-300.2':1,
//     'classroom|1':['精品语文班','精品作业A班','英语班','语文班'],
//     'from|1':['到店咨询','微店','壹家教','学习服务平台'],
//     'status|1':['意识强烈','预报名','意向一般','暂无意向'],
//      time:Mock.Random.date('yyyy-MM-dd'),
//      mobile:/^1[0-9]{10}$/  //用正则匹配1开头的11位数字的手机号
// });

export default {
    'GET /mock/standardmodel/review': (req, res) => {
        res.send(data);
    }
};

