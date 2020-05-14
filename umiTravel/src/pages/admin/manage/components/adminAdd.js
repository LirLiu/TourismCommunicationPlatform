// 添加管理员
import React, { Component } from 'react';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'
import {
  Form,
  Button,
  Upload,
  Icon,
  Input,
  Tooltip,
  Radio
} from 'antd';
import router from 'umi/router'

class AdminAdd extends Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (power, e) => {
    e.preventDefault();
    const { adminManage } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      values.power = Number(power) + 1;
      values.create = Date.parse(new Date());
      new Promise((resolve) => {
        const data = { ...values, mark: 0 }
        const params = { resolve, data }
        adminManage(params)
      }).then((res) => {
        alert(res.msg)
        this.props.form.setFieldsValue({
          account: '',
          password: '',
          confirm: '',
        })
      })
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
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
  handleConfirmBlur = e => {//验证密码的一致性
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  render() {
    const { adminInfo } = this.props
    const { getFieldDecorator } = this.props.form;
    let power = adminInfo.a_power;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />添加管理员</div>
        <div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(null, power)}>
            <Form.Item label="账号">
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入账号!',
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
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">确认</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Form.create({ name: 'editor' })(AdminAdd);
