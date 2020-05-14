import React from 'react'
import { List, Button } from 'antd';
import styles from '../index.less';
import { ArrowDownOutlined } from '@ant-design/icons';
import Link from 'umi/link'
const menu = ['全部', '优质', '热门']
export const ResultModule = (props) => {
  const listData = props.postList.map((item, index) => {
    return {
      key: index,
      id: item.p_id,
      title: item.p_title,
      comments: item.p_comments,
      views: item.p_views
    }
  })

  const handleMenuChange = (key) => {
    const { getPostList } = props
    if (key == 0) {
      const params = { type: 3, sign: 0 }
      getPostList(params)
    } else if (key == 1) {
      const params = { type: 3, sign: 1 }
      getPostList(params)
    } else if (key == 2) {
      const params = { type: 3, sign: 2 }
      getPostList(params)
    }
  }
  const handleViewsIncrease = (id, views) => {
    const { getViewsIncrease } = props
    let newViews = Number(views) + 1;
    const params = { id: id, views: newViews }
    getViewsIncrease({ data: params })
  }
  return (
    <div>
      <span>所有问题</span>
      {
        menu.map((item, index) => <Button key={index} onClick={handleMenuChange.bind(null, index)}><ArrowDownOutlined />{item}</Button>)
      }
      <List
        className={styles.noteList}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            onClick={handleViewsIncrease.bind(null, item.id, item.views)}
            key={item.id}
            extra={<span>{Number(item.views)}浏览&nbsp;&nbsp;&nbsp;{Number(item.comments)}回答</span>}

          >
            <List.Item.Meta
              title={<Link to={`/faqs/detail/${item.id}`}>{item.title}</Link>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default ResultModule