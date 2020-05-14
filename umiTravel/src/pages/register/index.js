import React, { Component } from 'react';
import styles from './index.less'
import { Form, Input, Tooltip, Icon, Checkbox, Button, Row, Col } from 'antd';
import router from 'umi/router'
import { connect } from 'dva'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = {
  // push: routerRedux.push,
  sendRegister: query => ({
    type: 'user/sendRegister',
    payload: query || {},
    // loading: true,
  }),
}
@connect(mapStateToProps, mapDispatchToProps)

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { sendRegister } = this.props
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      let timestamp = Date.parse(new Date());
      values.create = timestamp
      new Promise((resolve) => {
        const data = { ...values }
        const params = { resolve, data }
        sendRegister(params)
      }).then((res) => {
        alert(res.msg)
        if (res.code == 1000) {
          router.push('/login')
        }
      })
    });
  };

  handleConfirmBlur = e => {//验证密码的一致性
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码输入不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.register}>
        <div className={styles.reLeft}>
          <img src={[require('../../assets/reback.jpg')]} alt="" />
        </div>
        <div className={styles.reRight}>
          <div>
            旅游交流网
          </div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item
              label={
                <span>
                  昵称&nbsp;
              <Tooltip title="What do you want others to call you?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请填写昵称!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="账号">
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请填写账号',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: '请填写正确的邮箱格式!',
                  },
                  {
                    required: true,
                    message: '请填写邮箱!',
                  },
                ],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码!',
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="确认密码" hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: '密码不一致!',
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            {/* <p style={{ textAlign:'center',marginBottom:30}}>Welcome to join us!</p> */}
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                rules: [
                  {
                    required: true,
                    message: '请勾选！'
                  }
                ]
              })(
                <Checkbox>
                  Welcom to join us!
                </Checkbox>,
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button className={styles.reButton} type="primary" htmlType="submit">
                注册
          </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default WrappedRegistrationForm;