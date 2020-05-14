import React, { Component } from 'react';
import { List, Button, Card } from 'antd';
import styles from '../index.less'
import { FileOutlined } from '@ant-design/icons'
import moment from 'moment'


const tabListTitle = [
  {
    key: 0,
    tab: '分享帖',
  },
  {
    key: 1,
    tab: '游记',
  },
  {
    key: 2,
    tab: '约伴',
  },
  {
    key: 3,
    tab: '问答',
  },
];

export default class PostInfo extends Component {
  state = {
    titleKey: 0,
  }

  onTabChange = (key) => {
    this.setState({ titleKey: key });
    console.log(key, '666666666666666666666666666666666')
    const { postManage } = this.props
    const data = { mark: 1, type: key }
    const prams = { data }
    postManage(prams)
  };
  componentDidMount() {
    const { postManage } = this.props
    const prams = { mark: 1, type: 0 }
    postManage({ data: prams })
  }
  handlePostAction = (id, type) => {
    const { postManage } = this.props
    new Promise((resolve) => {
      const data = { id: id, mark: 0, examine: 1 }
      const params = { resolve, data }
      postManage(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const data = { mark: 1, type }
        const prams = { data }
        postManage(prams)
      }
    })
  }

  handleBackAction = (id, type) => {
    const { postManage } = this.props
    new Promise((resolve) => {
      const data = { id: id, mark: 0, examine: 2 }
      const params = { resolve, data }
      postManage(params)
    }).then((res) => {
      alert(res.msg)
      if (res.code == 1000) {
        const data = { mark: 1, type }
        const prams = { data }
        postManage(prams)
      }
    })
  }

  timeStamp = (data) => {
    let timestamp = moment(Number(data)).format('YY-MM-DD HH:mm:ss')
    return timestamp;
  }
  render() {
    const { postList } = this.props
    const { titleKey } = this.state
    const list = postList.map((item, index) => {
      return {
        key: index,
        id: item.p_id,
        examine: item.p_examine,
        title: item.p_title,
        type: item.p_type,
      }
    })
    return (
      <div className={styles.postInfo}>
        <Card
          style={{ width: '100%', border: 'none' }}
          tabList={tabListTitle}
          activeTabKey={String(titleKey)}
          onTabChange={key => {
            this.onTabChange(key);
          }}
        >
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
                    <Button style={{ color: 'red' }} type='link' key='list-loadmore-back' onClick={this.handleBackAction.bind(null, item.id, item.type)}>驳回</Button>,
                    <Button style={{ color: 'green' }} type='link' key="list-loadmore-go" onClick={this.handlePostAction.bind(null, item.id, item.type)} >通过</Button>
                  ] : (item.examine == 1 ? [<span style={{ color: 'green' }}>已通过</span>] : (item.examine == 2 ? [<span style={{ color: 'red' }}>已驳回</span>] : []))
                }
              >
                <div>{item.title}</div>
              </List.Item>
            )}
          />
        </Card>
      </div >
    );
  }
}