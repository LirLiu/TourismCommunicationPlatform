// 等你回答模块UI
import React, { Component } from 'react';
import { Divider, List } from 'antd';
import styles from '../index.less';
import Link from 'umi/link'

export default class WaitQuestion extends Component {

  handleViewsIncrease = (id, views) => {
    const { getViewsIncrease } = this.props
    let newViews = Number(views) + 1;
    const params = { id: id, views: newViews }
    getViewsIncrease({ data: params })
  }
  render() {
    const { zeroList } = this.props;
    const data = zeroList.map((item, index) => {
      return {
        key: index,
        id: item.p_id,
        title: item.p_title,
        views: item.p_views
      }
    })

    return (
      <div className={styles.waitQuestion}>
        <span>等您回答</span>
        <Divider style={{ margin: '10px 0' }} />
        <List
          itemLayout="horizontal"
          dataSource={data}
          split={false}
          renderItem={item => (
            <List.Item
              onClick={this.handleViewsIncrease.bind(null, item.id, item.views)}
            >
              <List.Item.Meta
                avatar={<img src={require('@/assets/faqs1.png')} alt='0回答' width={50} />}
                title={<Link to={`/faqs/detail/${item.id}`}>{item.title}</Link>}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}