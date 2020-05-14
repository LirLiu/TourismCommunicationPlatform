import React, { Component } from 'react';
import styles from '../index.less';
import { Avatar, Divider } from 'antd';
import { UserOutlined, RetweetOutlined } from '@ant-design/icons';
import RemarkOn from '@/components/Common/RemarkOn'
import functionCommon from '@/components/Common/FunctionCommon'
const { convers, conversion } = functionCommon

export default class ListExtra extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { postDetail: detail } = this.props
    return (
      <div className={styles.extraList}>
        <article>
          <div>
            <span>{detail.u_name}</span>
            <Avatar shape="square" size={100} src={detail.u_avatar} icon={detail.u_avatar ? '' : <UserOutlined />} />
            <em>注册日期：<div>{conversion(detail.u_create)}</div></em>
          </div>
          <div>
            <div>
              <span>发表与{conversion(detail.p_create)}</span>
              <span>山水相依，日月同曦</span>
            </div>
            <div>
              <p dangerouslySetInnerHTML={{ __html: detail.p_content }}></p>
            </div>
            <div className={styles.deThing}>
              <div style={{ fontSize: '16px', fontWeight: 500 }}>
                <sapn>时间：{convers(detail.w_start)} ~ {convers(detail.w_end)}</sapn>
                <em>联系电话：{detail.w_phone}</em>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <a><RetweetOutlined />回复</a>
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