import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, notification } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './page.less';
import classNames from 'classnames';
const FormItem = Form.Item;

const FormItemList = props => {
    const { getFieldDecorator, fields } = props;
    return (
        fields.map(item => {
            const { name, options, icon, placeholder } = item;
            const iconOptions = {type:icon, className:styles.icon, placeholder};
            return (
                <FormItem key={name}>
                    {getFieldDecorator(name, options)(
                        <Input size="large" prefix={ <Icon {...iconOptions} /> } />
                    )}
                </FormItem>
            );
        })
    );
};

class Login extends Component {
    state = {
        fields: [{
            name: 'account',
            icon: 'user',
            placeholder: '输入管理员帐号',
            options: {
                initialValue: '',
                rules: [{ required: true, max:20, message: '请正确输入管理员帐号!'}]
            }
        },{
            name: 'password',
            icon: 'lock',
            placeholder: '输入密码',
            options: {
                initialValue: '',
                rules: [{ required: true, max:20, message: '请正确输入密码!'}]
            }
        }]
    };

    // 提交表单
    handleSubmit = e => {
        e.preventDefault();
        const { validateFields } = this.props.form;
        validateFields((err, values) => {
            if (!err) {
                this.handleLogin(values);
            }
        });
    };

    // 登录请求
    handleLogin = async ({ account, password }) => {
        const { dispatch } = this.props;
        const res = await dispatch({
            type: 'login/fetchLogin',
            payload: { account, password }
        });
        if(res.code === 0) {
            this.routeTo('/standardmodel/review');
        } else {
            // res.code === 21002 帐号或密码错误
            notification.error({
                message: res.msg,
                description: '请检查后重新输入'
            });
        }
    };

    // 路由跳转
    routeTo = url => {
        const { dispatch } = this.props;
        dispatch(routerRedux.push(url));
    }

    render() {
        const { fields } = this.state;
        const { form } = this.props;
        return (
            <div className={styles.login_box}>
                {/* logo */}
                <div className="text-center">
                    <span className={classNames(styles.logo,'iconfont icon-soupei')} />
                </div>
                {/* Form */}
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItemList fields={fields} getFieldDecorator={form.getFieldDecorator}/>
                    <FormItem>
                        <Button type="primary" size="large" htmlType="submit" className={styles.submit}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const LoginForm = Form.create()(Login);
export default connect()(LoginForm);
