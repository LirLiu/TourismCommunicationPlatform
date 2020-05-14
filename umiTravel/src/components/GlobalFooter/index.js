import React from 'react';
import { Divider } from 'antd';

import styles from './index.less';

export const GlobalFooter = (props) => {
  return (
    <div className={styles.globalFooter}>
      <div>
        <a href='/'>首页</a>
        <Divider type="vertical" />
        <a href='/post'>分享帖</a>
        <Divider type="vertical" />
        <a href='/article'>游记</a>
        <Divider type="vertical" />
        <a href='/partner'>约伴</a>
        <Divider type="vertical" />
        <a href='/faqs'>问答</a>
        <Divider type="vertical" />
        <a href='/other'>其他</a>
      </div>
      <div>
        <p>
          <span>网站反馈邮箱：huayan_v@163.com</span>          <span>联系我们：18256813715</span>
        </p>
        <p>Copyright © 2020-至今 旅游交流网 版权所有</p>
      </div>

    </div>
  )
}

export default GlobalFooter