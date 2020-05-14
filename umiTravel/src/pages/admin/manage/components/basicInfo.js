import React, { Component } from 'react';
import { Descriptions } from 'antd';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'
import moment from 'moment'

const conversion = (data) => {
  let timestamp
  if (data) {
    timestamp = moment(Number(data)).format('YY-MM-DD HH:mm:ss')
  } else {
    timestamp = ''
  }
  return timestamp;
}
export default class BasicInfo extends Component {

  render() {
    const { adminInfo } = this.props
    let userSex = adminInfo.a_sex;

    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />基本信息</div>
        <div>
          <Descriptions title="基本信息">
            <Descriptions.Item label="性别">{userSex == 0 ? '保密' : (userSex == 1 ? '男' : '女')}</Descriptions.Item>
            <Descriptions.Item label="账号">{adminInfo.a_account}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{adminInfo.a_email ? adminInfo.a_email : '无'}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{conversion(adminInfo.a_create)}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}