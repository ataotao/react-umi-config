import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Button, Table } from 'antd';
// import classNames from 'classnames';
// import styles from './page.less';

const columns1 = [{ title: '数据源', dataIndex: 'd1', key: 'd1' },
    { title: '车型编号', dataIndex: 'd2', key: 'd2' },
    { title: '品牌', dataIndex: 'd3', key: 'd3' },
    { title: '主机厂', dataIndex: 'd4', key: 'd4' },
    { title: '车型', dataIndex: 'd5', key: 'd5' },
    { title: '配置等级', dataIndex: 'd6', key: 'd6' },
    { title: '年款', dataIndex: 'd7', key: 'd7' },
    { title: '排放标准', dataIndex: 'd8', key: 'd8' },
    { title: '排量', dataIndex: 'd9', key: 'd9' },
    { title: '发动机型号', dataIndex: 'd10', key: 'd10' },
    { title: '状态', dataIndex: 'd11', key: 'd11' },
    { title: '查看', dataIndex: 'd12', key: 'd12', render: (text, record, index) => {
        return <a href="##">详细</a>;
    } }];
  
const data1 = [{ key: 1, d1: '精友', d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01', d11: '关键属性更新' },{ key: 2, d1: '精友', d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01', d11: '关键属性更新' }];

const columns2 = [
    { title: '车型编号', dataIndex: 'd2', key: 'd2' },
    { title: '品牌', dataIndex: 'd3', key: 'd3' },
    { title: '主机厂', dataIndex: 'd4', key: 'd4' },
    { title: '车型', dataIndex: 'd5', key: 'd5' },
    { title: '配置等级', dataIndex: 'd6', key: 'd6' },
    { title: '年款', dataIndex: 'd7', key: 'd7' },
    { title: '排放标准', dataIndex: 'd8', key: 'd8' },
    { title: '排量', dataIndex: 'd9', key: 'd9' },
    { title: '发动机型号', dataIndex: 'd10', key: 'd10' },
    { title: '编辑', dataIndex: 'd11', key: 'd11', render: (text, record, index) => <a href="##">编辑</a> },
    { title: '删除', dataIndex: 'd12', key: 'd12', render: (text, record, index) => <a href="##">删除</a> }
];
   
const data2 = [{ key: 1, d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01' },{ key: 2, d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01' }];

const columns3 = [
    { title: '车型编号', dataIndex: 'd2', key: 'd2' },
    { title: '品牌', dataIndex: 'd3', key: 'd3' },
    { title: '主机厂', dataIndex: 'd4', key: 'd4' },
    { title: '车型', dataIndex: 'd5', key: 'd5' },
    { title: '配置等级', dataIndex: 'd6', key: 'd6' },
    { title: '年款', dataIndex: 'd7', key: 'd7' },
    { title: '排放标准', dataIndex: 'd8', key: 'd8' },
    { title: '排量', dataIndex: 'd9', key: 'd9' },
    { title: '发动机型号', dataIndex: 'd10', key: 'd10' },
    { title: '审核状态', dataIndex: 'd11', key: 'd11' },
    { title: '详细', dataIndex: 'd12', key: 'd12', render: (text, record, index) => <a href="##">详细</a> }
];
   
const data3 = [
    { key: 1, d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01', d11: '已审核' },
    { key: 2, d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01', d11: '待审核:新车型' },
    { key: 3, d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01', d11: '待审核:关联车型有更新' },
    { key: 4, d2: '123343', d3: '奥迪', d4: '一汽奥迪', d5: '奥迪100', d6: '纪念版', d7: '国1', d8: '2.0T', d9: '前置前驱', d10: 'ERT01', d11: '已审核' },
];


class Edit extends Component {
    state = {

    };
    
    componentDidMount() {
        console.log(this.props);
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`onChange: selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect: (record, selected, selectedRows) => {
                console.log('onSelect', record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                console.log('onSelectAll', selected, selectedRows, changeRows);
            }
        };
        columns1.forEach(item => {
            if(item.dataIndex != 'd12') {
                item.sorter = (a, b) => {
                    const x = a[item.dataIndex];
                    const y = b[item.dataIndex];
                    return isNaN(x) ? x.localeCompare(y) :  x - y;
                };
            }
        });

        return (
            <Card bordered={false}>
                {/* 关联源车型 */}
                <Row align="middle" type="flex">
                    <Col span={12} className="f20">关联源车型</Col>
                    <Col span={12} className="text-right"><Button type="primary">解除关联</Button></Col>
                </Row>
                <Table className="m-t-15" pagination={false} rowSelection={rowSelection} columns={columns1} rowKey={item => item.key} dataSource={data1} loading={this.props.loading}  />

                {/* 审核标准车型 */}
                <Row align="middle" type="flex" className="m-t-15">
                    <Col className="f20">审核标准车型</Col>
                </Row>
                <Table className="m-t-15" pagination={false} rowSelection={rowSelection} columns={columns2} rowKey={item => item.key} dataSource={data2} loading={this.props.loading}  /> 

                {/* 审核标准车型 */}
                <Row align="middle" type="flex" className="m-t-15">
                    <Col span={12} className="f20">合并标准车型</Col>
                    <Col span={12} className="text-right"><Button type="primary">审核通过</Button></Col>
                </Row>
                <Table className="hideSelectAll m-t-15" pagination={false} rowSelection={rowSelection} columns={columns3} rowKey={item => item.key} dataSource={data3} loading={this.props.loading}  /> 
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {loading: state.loading.global, list: state.review.list};
};
export default connect(mapStateToProps)(Edit);
