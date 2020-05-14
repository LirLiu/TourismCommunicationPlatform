import React, { Component } from 'react';
import { Card } from 'antd';
import styles from '../index.less'
import AdminList from './adminList'
import AdminAdd from './adminAdd'

const tabListTitle = [
  {
    key: 'basicInfo',
    tab: '管理员列表',
  },
  {
    key: 'accountManage',
    tab: '添加管理员',
  },
];

export default class ChildManage extends Component {
  state = {
    titleKey: 'basicInfo',
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const contentList = {
      basicInfo: <AdminList {...this.props} />,
      accountManage: <AdminAdd {...this.props} />,
    };

    return (
      <Card
        style={{ width: '100%', border: 'none' }}
        tabList={tabListTitle}
        activeTabKey={this.state.titleKey}
        onTabChange={key => {
          this.onTabChange(key, 'titleKey');
        }}
      >
        {contentList[this.state.titleKey]}
      </Card>
    );
  }
}