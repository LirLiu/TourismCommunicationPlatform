// 详情页面面包屑模块UI
import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import styles from './index.less'

class BreadCrumbs extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { mark, markTag, markTitle,markArea } = this.props.showBreadHead;

    return (
      <div className={styles.breadCrumb}>
        <Breadcrumb separator={<img src={require('@/assets/indexbgq.gif')} alt='>' width={12} />}>
          <Breadcrumb.Item href='/'>首页</Breadcrumb.Item>
          <Breadcrumb.Item >{mark}</Breadcrumb.Item>
          {
            markArea ? <Breadcrumb.Item >{markArea}</Breadcrumb.Item> : ''
          }
          <Breadcrumb.Item >{markTag}</Breadcrumb.Item>
          <Breadcrumb.Item>{markTitle}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }
}

export default BreadCrumbs;