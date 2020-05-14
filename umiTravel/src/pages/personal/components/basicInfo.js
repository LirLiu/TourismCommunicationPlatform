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
    const { userInfo, userPost, userReview } = this.props
    let userSex = userInfo.u_sex;
    let postCount, reviewCount;
    if (userPost.length == 0 || userReview.length == 0) {
      postCount = 0
      reviewCount = 0
    } else {
      postCount = userPost[0].postCount
      reviewCount = userReview[0].reviewCount
    }
    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />基本信息</div>
        <div>
          <Descriptions title="基本信息">
            <Descriptions.Item label="性别">{userSex == 0 ? '保密' : (userSex == 1 ? '男' : '女')}</Descriptions.Item>
            <Descriptions.Item label="账号">{userInfo.u_account}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{userInfo.u_email}</Descriptions.Item>
            <Descriptions.Item label="发帖数">{postCount}</Descriptions.Item>
            <Descriptions.Item label="评论数">{reviewCount}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{conversion(userInfo.u_create)}</Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }
}