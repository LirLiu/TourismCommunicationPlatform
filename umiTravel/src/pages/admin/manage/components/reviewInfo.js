import React, { Component } from 'react';
import { List, Button } from 'antd';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'
import moment from 'moment'

export default class ReviewInfo extends Component {

  componentDidMount() {
    const { reviewManage } = this.props
    const pams = { mark: 1 }
    reviewManage({ data: pams })
  }
  handlePostAction = (id) => {
    const { reviewManage } = this.props
    new Promise((resolve) => {
      const data = { id: id, mark: 0, examine: 1 }
      const params = { resolve, data }
      reviewManage(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const data = { mark: 1 }
        const prams = { data }
        reviewManage(prams)
      }
    })
  }

  handleBackAction = (id) => {
    const { reviewManage } = this.props
    new Promise((resolve) => {
      const data = { id: id, mark: 0, examine: 2 }
      const params = { resolve, data }
      reviewManage(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const data = { mark: 1 }
        const prams = { data }
        reviewManage(prams)
      }
    })
  }

  timeStamp = (data) => {
    let timestamp = moment(Number(data)).format('YY-MM-DD HH:mm:ss')
    return timestamp;
  }
  render() {
    const { reviewList } = this.props

    const list = reviewList.map((item, index) => {
      return {
        key: index,
        id: item.r_id,
        examine: item.r_examine,
        title: item.r_content,
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
              pageSize: 10,
            }}
            renderItem={item => (
              <List.Item
                actions={
                  item.examine == 0 ? [
                    <Button style={{ color: 'red' }} type='link' key='list-loadmore-back' onClick={this.handleBackAction.bind(null, item.id)}>驳回</Button>,
                    <Button style={{ color: 'green' }} type='link' key="list-loadmore-go" onClick={this.handlePostAction.bind(null, item.id)} >通过</Button>
                  ] : (item.examine == 1 ? [<span style={{ color: 'green' }}>已通过</span>] : (item.examine == 2 ? [<span style={{ color: 'red' }}>已驳回</span>] : []))
                }
              >
                <div>{item.title}</div>
              </List.Item>
            )}
          />
        </div>
      </div >
    );
  }
}