// 子组件公共头部
import React, { Component } from 'react';
import { PageHeader, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.less'
import Link from 'umi/link'

export default class ChildHead extends Component {

  render() {
    const { alb, sign, subSign, alButton } = this.props.showHeadPane
    const routes = [
      {
        path: '/',
        breadcrumbName: '首页',
      },
      {
        breadcrumbName: sign,
      },
    ];
    return (
      <div className={styles.childHead}>
        <div className={styles.chWrapper}>
          <PageHeader
            className="site-page-header"
            title={sign}
            breadcrumb={{ routes }}
            subTitle={subSign}
            extra={[
              alb === true ? <Button className={styles.chButton}><Link to={`/release`}><EditOutlined /> {alButton}</Link></Button> : <span />,
            ]}
          />
        </div>
      </div>
    )
  }
}