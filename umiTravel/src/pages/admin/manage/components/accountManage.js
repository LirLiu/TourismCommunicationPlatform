// 账户管理
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

class AccountManage extends Component {

  handleSubmit = (pre, e) => {
    e.preventDefault();
    const { modifyAdmin, getAdminInfo, uploadAvatar } = this.props
    let session = sessionStorage.getItem('account')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      let newSex = Number(values.sex)
      values.sex = newSex
      values.account = session
      if (values.avatar !== undefined) {
        values.avatar = values.avatar[0]
      }
      new Promise((resolve) => {
        if (values.avatar) {
          if (pre.a_name == values.nickname && pre.a_password == values.password && pre.a_email == values.email && pre.a_sex == values.sex) {
            const data = { avatar: values.avatar, account: session }
            const params = { resolve, data }
            uploadAvatar(params)
          } else {
            if (values.nickname == '' || values.password == '' || values.email == '') {
              alert('不可为空，请输入！')
            } else {
              const data1 = { avatar: values.avatar, account: session }
              const data2 = { ...values }
              const params = { resolve, data: data1 }
              const prams = { resolve, data: data2 }
              uploadAvatar(params)
              modifyAdmin(prams)
            }
          }
        } else {
          if (pre.a_name == values.nickname && pre.a_password == values.password && pre.a_email == values.email && pre.a_sex == values.sex) {
            alert('未做任何修改！')
          } else {
            if (values.nickname == '' || values.password == '' || values.email == '') {
              alert('不可为空，请输入！')
            } else {
              const data = { ...values }
              const prams = { resolve, data }
              modifyAdmin(prams)
            }
          }
        }
      }).then((res) => {
        alert(res.msg)
        if (values.password != pre.a_password) {
          window.sessionStorage.clear()
          router.push('/admin')
        }
        if (res.code == 1000) {
          const prams = { account: session }
          getAdminInfo({ data: prams })
        }
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

  render() {
    const { adminInfo } = this.props
    const { getFieldDecorator } = this.props.form;
    let adminSex = Number(adminInfo.a_sex)
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />账号管理</div>
        <div>
          <Form {...formItemLayout} onSubmit={this.handleSubmit.bind(null, adminInfo)}>
            <Form.Item label="头像">
              {getFieldDecorator('avatar', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture" >
                  <Button >
                    <Icon type="upload" /> 点击上传
              </Button>
                </Upload>,
              )}
            </Form.Item>
            {
              adminInfo.a_avatar ? <div style={{ width: 120, height: 120, background: '#cccccc', margin: '0 auto' }}><img style={{ width: '100%', height: '100%' }} src={adminInfo.a_avatar} alt='头像' /></div> : ''
            }
            <Form.Item
              label={
                <span>
                  昵称&nbsp;
              <Tooltip title="为您取一个好听的昵称吧！">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {getFieldDecorator('nickname', {
                initialValue: adminInfo.a_name || '',
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('sex', {
                initialValue: String(adminSex),
              })(
                <Radio.Group>
                  <Radio value="0">保密</Radio>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </Radio.Group>,
              )}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                initialValue: adminInfo.a_password,
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ],
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                initialValue: adminInfo.a_email,
                rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱!',
                  },
                  {
                    required: true,
                    message: '请输入邮箱!',
                  },
                ],
              })(<Input />)}
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
export default Form.create({ name: 'editor' })(AccountManage);
