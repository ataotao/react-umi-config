import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Input, Upload, Button, Icon, message} from 'antd';
import styles from './page.less';
const FormItem = Form.Item;

// 上传表单模板
class UploadFromTemp extends Component {
    render(){
        const {field, index, onMessage} = this.props;
        const config = {
            accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
            fileList: field.fileList,
            beforeUpload: () => {return false;},
            onChange: info => {
                const {field, index, onMessage} = this.props;
                onMessage({type: 'change', data: {info, field, index}});
            }
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const submitItemLayout = {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 4 },
        };
        return (
            <Card className={styles.content} title={field.title}>
                <Form>
                    <FormItem label="version版本号" {...formItemLayout}>
                        <Input placeholder='请输入version版本号' onChange={event => onMessage({type: 'version', data: {event, field, index}})} />
                    </FormItem>
                    <FormItem label="文件导入" {...formItemLayout}>
                        <Upload {...config} >
                            <Button>
                                <Icon type="upload" /> 选择文件
                            </Button>
                        </Upload>
                    </FormItem>
                    <FormItem wrapperCol={submitItemLayout}>
                        <Button className="upload-demo-start" type="primary" onClick={() => onMessage({type: 'upload', data: {field, index}})} disabled={field.fileList.length === 0 || !field.version} loading={field.uploading}>
                            {field.uploading ? '文件上传中...' : '数据导入'}
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}

// 车型数据导入
class Dataimport extends Component {
    state = {
        fields: [{
            title: '车型数据导入',
            fileList: [],
            version: '',
            uploading: false
        }]
    };

    // 修改版本号
    handleVersion = ({ event, field, index }) => {
        let fields = [...this.state.fields];
        field = {...field};
        field.version = event.target.value;
        fields[index] = field;
        this.setState({ fields });
    };

    // 获取上传文件
    handleChange = ({ info, field, index }) => {
        let fields = [...this.state.fields];
        let fileList = info.fileList;
        fileList = fileList.slice(0, 1);
        fields[index].fileList = fileList;
        this.setState({ fields });
    };

    // 改变数据状态
    setStateFn = (fields, field, index)=> {
        fields[index] = field;
        this.setState({
            fields
        });
    };

    // 上传文件
    handleUpload = async ({field, index}) => {
        const { fileList } = field;
        const { dispatch } = this.props;
        let fields = [...this.state.fields];
        field = {...field};
        // 加载处理
        field.uploading = true;
        this.setStateFn(fields, field, index);

        // 组合上传信息
        let fd = new FormData();
        fd.append('file_path', fileList[0]);
        fd.append('version', field.version);
        const res = await dispatch({
            type: 'dataimport/fetchImport',
            payload: fd
        });
        
        if (res.code == 0) {
            message.success('上传成功');
            this.setStateFn(fields, {uploading:false, version: '', fileList: []}, index);
        }
        
        if(res.code > 0) {
            field.uploading = false;
            message.error('上传失败');
            this.setStateFn(fields, field, index);
        }
        

    };

    // 子组件通知
    onMessage = msg => {
        let fnName = {
            version: 'handleVersion',
            change: 'handleChange',
            upload: 'handleUpload',
        };
        this[fnName[msg.type]](msg.data);
    };

    render() {
        const { fields } = this.state;
        return fields.map((field, index) => {
            return (
                <UploadFromTemp key={index} field={field} index={index} onMessage={this.onMessage} />
            );
        });
    }
}

export default connect()(Dataimport);