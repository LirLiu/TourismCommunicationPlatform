// 管理员列表
import React, { Component } from 'react';
import { List, Button } from 'antd';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'
import moment from 'moment'

export default class AdminList extends Component {

  componentDidMount() {
    const { getAdminInfo, adminManage } = this.props
    let session = sessionStorage.getItem('account')
    new Promise((resolve) => {
      const data = { account: session }
      const params = { resolve, data }
      getAdminInfo(params)
    }).then((res) => {
      const power = res.list[0].a_power
      const data = { power: Number(power + 1), mark: 1 }
      adminManage({ data })
    })
  }

  timeStamp = (data) => {
    let timestamp = moment(Number(data)).format('YY-MM-DD HH:mm:ss')
    return timestamp;
  }
  handleAdminDel = (account, power) => {
    const { adminManage } = this.props
    new Promise((resolve) => {
      const data = { account, mark: 2 }
      const params = { resolve, data }
      adminManage(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const data = { power: Number(power + 1), mark: 1 }
        adminManage({ data })
      }
    })
  }
  render() {
    const { adminList, adminInfo } = this.props
    const power = adminInfo.a_power
    const list = adminList.map((item, index) => {
      return {
        key: index,
        account: item.a_account,
        nickName: item.a_name,
      }
    })
    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />管理员管理 &nbsp;{list.length}</div>
        <div>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            pagination={{
              pageSize: 12,
            }}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button style={{ color: 'red' }} type='link' key='list-loadmore-back' onClick={this.handleAdminDel.bind(null, item.account, power)}>删除</Button>
                ]}
              >
                <div>昵称：{item.name}<br />账号：{item.account}</div>
              </List.Item>
            )}
          />
        </div>
      </div >
    );
  }
}