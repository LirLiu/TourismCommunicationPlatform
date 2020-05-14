import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styles from './index.less';
import router from 'umi/router'
import { connect } from 'dva'
const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = {
  // push: routerRedux.push,
  sendLogin: query => ({
    type: 'user/sendLogin',
    payload: query || {},
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { sendLogin } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      new Promise((resolve) => {
        const data = { ...values }
        const params = { resolve, data }
        sendLogin(params)
      }).then((res) => {
        alert(res.msg)
        if (res.code == 1000) {
          sessionStorage.setItem('account', values.account);
          router.push('/')
        }
      })
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.loginStyle}>
        <div>
          <img src={[require('../../assets/larback.jpg')]} alt="" />
        </div>
        <div>
          <div>
            旅游交流网
          </div>
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                <span>登录</span>
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('account', {
                  rules: [{ required: true, message: '请输入账号!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="账户"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item >
                <a style={{ float: 'right' }} className="login-form-forgot">
                  忘记密码
                </a>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(Login);

