import React, { Component } from 'react';
import styles from '../index.less';
import { Avatar, Divider, Button } from 'antd';
import { UserOutlined, RetweetOutlined } from '@ant-design/icons';
import RemarkOn from '@/components/Common/RemarkOn'
import functionCommon from '@/components/Common/FunctionCommon'
const { delNbsp, conversion } = functionCommon

export default class ListExtra extends Component {
  render() {
    const { postDetail: detail } = this.props
    return (
      <div className={styles.listExtra}>
        <article>
          <div>
            <span>{detail.u_name}</span>
            <Avatar shape="square" size={100} src={detail.u_avatar} icon={detail.u_avatar ? '' : <UserOutlined />} />
            <em>注册日期：<div>{conversion(detail.u_create)}</div></em>
          </div>
          <div>
            <div>
              <span>发表与{conversion(detail.p_create)}</span>
              <span>余香缭绕，篇章辉煌</span>
            </div>
            <div>
              <p dangerouslySetInnerHTML={{ __html: detail.p_content }}></p>
            </div>
            <div>
              <Divider style={{ margin: '10px 0' }} />
              <Button type='link' ><RetweetOutlined />回复</Button>
            </div>
          </div>
        </article>
        <div>
          <div />
          <span>网友评论</span>
          <Divider />
          <RemarkOn {...this.props} />
        </div>
      </div>
    );
  }
}