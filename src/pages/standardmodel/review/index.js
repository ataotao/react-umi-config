import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Form, Select, Input, Button, Divider, Table } from 'antd';
import SelectComponent from './components/SelectComponent';
import Link from 'umi/link';
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class ReviewForm extends Component {
    state = {
        // 数据源
        dataSource: [{key:'全部', val:'全部'},{key:'精友', val:'精友'},{key:'力洋', val:'力洋'},{key:'搜配', val:'搜配'}],
        // 审核状态
        approvalStatus: [{key:'全部', val:'全部'},{key:'待审核', val:'待审核'},{key:'已审核', val:'已审核'}],
        // 品牌
        brandOptions: [{key:'全部', val:'全部'},{key:'奥迪', val:'奥迪'},{key:'宝马', val:'宝马'},{key:'本田', val:'本田'}],
        // 主机厂
        factoryOptions:[{key:'全部', val:'全部'},{key:'进口奥迪', val:'进口奥迪'},{key:'进口宝马', val:'进口宝马'},{key:'广汽本田', val:'广汽本田'}],
        // 车型
        modelOptions: [{key:'雅阁',val:'雅阁'}, {key:'飞度', val:'飞度'}, {key:'奥德赛', val:'奥德赛'}],
        // 车型属性
        modelAttrs: [[{key:'车型属性', val:'车型属性'},{key:'年款', val:'年款'},{key:'排量', val:'排量'},{key:'驱动方式', val:'驱动方式'},{key:'发动机型号', val:'发动机型号'}]],
        tableTitle: [],
        tableList: [],
        pagination: {},
    };
    
    componentDidMount() {
        this.fetchList();
    }

    // 获取分页数据
    fetchList = async (page = 1, size = 10) =>{
        const {dispatch} = this.props;
        await dispatch({
            type: 'review/fetchList',
            payload: {page}
        });
        let {tableList, tableTitle, total} = this.props;
        tableTitle = tableTitle.map(item => {
            let obj = {...item};
            if(item.dataIndex == 'operating') {
                obj.render = () => <Link to="/standardmodel/review/edit">编辑</Link>;
            }else{
                obj.sorter = (a, b) => {
                    const x = a[item.dataIndex];
                    const y = b[item.dataIndex];
                    return isNaN(x) ? x.localeCompare(y) :  x - y;
                };
            }
            return obj;
        });
        this.setState({
            tableTitle,
            tableList,
            pagination: {
                total: parseInt(total, 10),
                pageSize: size,
                showSizeChanger: true,
                onShowSizeChange: this.onShowSizeChange,
                onChange: this.handleTableChange
            }
        });

    };

    // 提交搜索
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    // 车型搜索过滤
    handleModelChange = (value) => {
        let options;
        if(!value) {
            options = [];
        }else{
            options =  this.state.modelOptions.filter(model => model.val.indexOf(value) > -1)
                .map(model => <Option key={model.key}>{model.val}</Option>);
        }        
        this.setState({ modelOptions: options });
    };

    // 添加筛选属性
    addModelAttr = ()=> { 
        const modelAttrs = [...this.state.modelAttrs];
        if(modelAttrs.length > 3) return;
        this.setState({
            modelAttrs: [...modelAttrs, modelAttrs[0]]
        });
    };

    // 表格分页
    handleTableChange = (page, pageSize) => {
        this.fetchList(page);
    };

    // 改变单页数量
    onShowSizeChange = (current, size) => {
        this.fetchList(current, size);
    };

    render() {
        const { loading, form } = this.props;
        const { getFieldDecorator } = form;
        const { modelAttrs, dataSource, approvalStatus, brandOptions, factoryOptions, modelOptions, tableTitle, tableList, pagination} = this.state;
        const brandSelectConfig = {
            style: {width: 150},
            showSearch: true,
            optionFilterProp: 'children',
            placeholder: '请选择',
            filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        };
        const modelSelectConfig = {
            style: {width: 150},
            mode: 'combobox',
            placeholder: '请选择',
            onChange: this.handleModelChange,
            filterOption:false,
            showArrow:false
        };
        
        return (
            <Card bordered={false}>
                {/* 筛选表单 */}
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Row>
                        <FormItem label="数据源：">
                            <SelectComponent getFieldDecorator={getFieldDecorator} selectConfig={{ style:{ width: 150 }}} options={dataSource} name="dataSource" />
                        </FormItem>
                        <FormItem label="审核状态：">
                            <SelectComponent getFieldDecorator={getFieldDecorator} selectConfig={{ style:{ width: 150 }}} options={approvalStatus} name="approvalStatus" />

                        </FormItem>
                        <FormItem label="品牌：">
                            <SelectComponent getFieldDecorator={getFieldDecorator} selectConfig={brandSelectConfig} options={brandOptions} name="brandOptions" />
                        </FormItem>
                        <FormItem label="主机厂：">
                            <SelectComponent getFieldDecorator={getFieldDecorator} selectConfig={brandSelectConfig} options={factoryOptions} name="factoryOptions" />
                        </FormItem>
                        <FormItem label="车型：">
                            <SelectComponent getFieldDecorator={getFieldDecorator} selectConfig={modelSelectConfig} options={modelOptions} name="modelOptions" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">搜索</Button>
                        </FormItem>
                    </Row>
                    <Row className="m-t-10">
                        <InputGroup compact>
                            {
                                modelAttrs.map((item, index) => {
                                    return (
                                        <FormItem key={index}>
                                            {
                                                getFieldDecorator('modelAttrInput' + index)(
                                                    <Input addonBefore={
                                                        <SelectComponent getFieldDecorator={getFieldDecorator} selectConfig={{ style:{ width: 100 }}} options={item} name={'modelAttr' + index} />
                                                    } style={{ width: '100%' }}  placeholder="输入关键字" />
                                                )
                                            }
                                        </FormItem>
                                    );
                                })
                            }
                            <FormItem>
                                <Button icon="plus" onClick={this.addModelAttr}>增加筛选属性</Button>
                            </FormItem>
                        </InputGroup>
                    </Row>
                </Form>
                {/* 表格 */}
                <Divider style={{marginBottom: 15}} />
                <Row className="text-right">
                    <Button type="primary">创建标准车型</Button>
                </Row>
                <Table className="m-t-15" columns={tableTitle} rowKey={item => item.num} dataSource={tableList} pagination={pagination} loading={loading} />
            </Card>
        );
    }
}

const mapStateToProps = state => ({loading: state.loading.models.review, ...state.review});
const Review = Form.create()(ReviewForm);
export default connect(mapStateToProps)(Review);




