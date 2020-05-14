import React, { Component } from 'react';
import { Descriptions, List, Button } from 'antd';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'

export default class ReviewInfo extends Component {

  handleReviewDel = (id, pid, comments) => {
    const { deleteUserElse, getUserReview, getViewsIncrease } = this.props
    let session = sessionStorage.getItem('account')
    new Promise((resolve) => {
      const data = { id: id, symbol: 1 }
      const params = { resolve, data }
      deleteUserElse(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const prams = { account: session, mark: 1 }
        getUserReview(prams)
        const pams = { sign: 1, count: Number(comments) - 1, id: pid }
        getViewsIncrease({ data: pams })
      }
    })
  }
  render() {
    const { userReview } = this.props
    const list = userReview.map((item, index) => {
      return {
        key: index,
        id: item.r_id,
        pid: item.r_post,
        comments: item.p_comments,
        content: item.r_content,
        examine: item.r_examine,
      }
    })
    return (
      <div className={styles.basicInfo}>
        <div><FileOutlined />评论管理 &nbsp;{list.length}</div>
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
                actions={[
                  <a key="list-loadmore-edit" onClick={this.handleReviewDel.bind(null, item.id, item.pid, item.comments)}>删除</a>
                ]}
              >
                <div>
                  {item.content === undefined ? '' : (item.content.slice(0, 40) + '...')}
                  {item.examine == 0 ? <span style={{ color: 'yellow', marginLeft: 30 }}>待审核</span>
                    : (item.examine == 1 ? <span style={{ color: 'green', marginLeft: 30 }}>已通过审核</span>
                      : (item.examine == 2 ? <span style={{ color: 'red', marginLeft: 30 }}>未通过审核</span> : ''))}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}