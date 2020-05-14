import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less';
import router from 'umi/router'
import { connect } from 'dva'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}
const mapDispatchToProps = {
  // push: routerRedux.push,
  adminSend: query => ({
    type: 'admin/adminSend',
    payload: query || {},
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class AdminLogin extends Component {

  handleSubmit = e => {
    e.preventDefault();
    const { adminSend } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      new Promise((resolve) => {
        const data = { ...values }
        const params = { resolve, data }
        adminSend(params)
      }).then((res) => {
        alert(res.msg)
        if (res.code == 1000) {
          sessionStorage.setItem('account', values.account);
          router.push('/admin/manage')
        }
      })
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.adminLogin}>
        <div>
          <img src={[require('../../assets/adminBack.jpg')]} alt="" />
        </div>
        <div>
          <div>
            旅游交流网后台
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

export default Form.create({ name: 'admin_login' })(AdminLogin);

