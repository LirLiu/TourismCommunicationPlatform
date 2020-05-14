import React, { Component } from 'react';
import { List } from 'antd';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'
import moment from 'moment'

export default class PostInfo extends Component {

  handlePostDel = (id) => {
    const { deleteUserElse, getUserPost } = this.props
    let session = sessionStorage.getItem('account')
    new Promise((resolve) => {
      const data = { id: id, symbol: 0 }
      const params = { resolve, data }
      deleteUserElse(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const prams = { account: session, mark: 1 }
        getUserPost(prams)
      }
    })
  }

  timeStamp = (data) => {
    let timestamp = moment(Number(data)).format('YY-MM-DD HH:mm:ss')
    return timestamp;
  }

  render() {
    const { userPost } = this.props
    const list = userPost.map((item, index) => {
      return {
        key: index,
        id: item.p_id,
        title: item.p_title,
        examine: item.p_examine
      }
    })
    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />帖子管理 &nbsp;{list.length}</div>
        <div>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={list}
            pagination={{
              pageSize: 8,
            }}
            renderItem={item => (
              <List.Item
                actions={[<a key="list-loadmore-edit" onClick={this.handlePostDel.bind(null, item.id, item.comments)} > 删除</a>]}
              >
                <div>
                  {item.title}
                  {item.examine == 0 ? <span style={{ color: 'yellow', marginLeft: 30 }}>待审核</span>
                    : (item.examine == 1 ? <span style={{ color: 'green', marginLeft: 30 }}>已通过审核</span>
                      : (item.examine == 2 ? <span style={{ color: 'red', marginLeft: 30 }}>未通过审核</span> : ''))}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div >
    );
  }
}