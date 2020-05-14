// 分享帖列表
import React, { Component } from 'react';
import styles from '../index.less';
import { Table } from 'antd';
import router from 'umi/router';
import Link from 'umi/link'
import functionCommon from '@/components/Common/FunctionCommon'
const { delNbsp, conversion } = functionCommon


export default class ListModule extends Component {

  handleViewsIncrease = (id, views) => {
    const { getViewsIncrease } = this.props
    let newViews = Number(views) + 1;
    const params = { id: id, views: newViews }
    getViewsIncrease({ data: params })
  }
  render() {
    const { postList: list } = this.props
    const columns = [
      {
        title: '分享帖标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <div onClick={this.handleViewsIncrease.bind(null, text.id, text.views)}><Link to={`/post/detail/${text.id}`}><img style={{ marginRight: '10px' }} src={require('@/assets/folder_new.gif')} alt='分享帖标题' />{text.title}</Link></div>,
      },
      {
        title: '作者/发布时间',
        dataIndex: 'author',
        key: 'author',
        width: 180
      },
      {
        title: '回复/查看',
        dataIndex: 'reply',
        key: 'reply',
        width: 150,
      },
    ];
    const data = list.map((item, index) => {
      return {
        key: index,
        title: { title: item.p_title, id: item.p_id, views: item.p_views },
        author: <span>{item.u_name}<br />{conversion(item.p_create)}</span>,
        reply: <span>{Number(item.p_comments)}&nbsp;/&nbsp;{Number(item.p_views)}</span>
      }
    })
    return (
      <div className={styles.listModule}>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}