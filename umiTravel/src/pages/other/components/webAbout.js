// 相关网站组件
import React, { Component } from 'react';
import styles from '../index.less'
import { Card, Drawer, Button, List } from 'antd';

export default class WebAbout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const data = [
      {
        name: '途牛网',
        url: 'https://www.tuniu.com/'
      },
      {
        name: '马蜂窝',
        url: 'http://www.mafengwo.cn/'
      },
      {
        name: '携程网',
        url: 'https://www.ctrip.com/'
      },
      {
        name: '去哪儿',
        url: 'https://www.qunar.com/'
      },
      {
        name: '艺龙',
        url: 'http://www.elong.com/'
      },
      {
        name: '飞猪',
        url: 'https://www.fliggy.com/'
      },
      {
        name: '穷游',
        url: 'https://www.qyer.com/'
      },
      {
        name: '同程旅行',
        url: 'https://www.ly.com/'
      },
    ];
    return (
      <div className={styles.webAbout}>
        <div>
          <img src='http://127.0.0.1:3000/images/1588589599255.jpg' />
        </div>
        <div>
          <List
            header='相关网站推荐'
            grid={{ gutter: 16, column: 4 }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <a href={item.url} target='_blank'>{item.name}</a>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}