import React, { Component } from 'react';
import { Card } from 'antd';
import styles from '../index.less'
import BasicInfo from './basicInfo'
import AccountManage from './accountManage'

const tabListTitle = [
  {
    key: 'basicInfo',
    tab: '个人信息',
  },
  {
    key: 'accountManage',
    tab: '账户管理',
  },
];

export default class AdminInfo extends Component {
  state = {
    titleKey: 'basicInfo',
  }

  componentDidMount() {
    const { getAdminInfo } = this.props
    let session = sessionStorage.getItem('account')
    const params = { account: session }
    getAdminInfo({ data: params })
  }
  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const contentList = {
      basicInfo: <BasicInfo {...this.props} />,
      accountManage: <AccountManage {...this.props} />,
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