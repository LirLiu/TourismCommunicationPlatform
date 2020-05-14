import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import styles from './index.less'
import AdminInfo from './components/adminInfo'
import PostInfo from './components/postInfo'
import ReviewInfo from './components/reviewInfo'
import ChildManage from './components/adminManage'
import { connect } from 'dva'

const mapStateToProps = (state, ownProps) => {
  return {
    adminInfo: state.admin.adminInfo,
    postList: state.admin.postList,
    reviewList: state.admin.reviewList,
    adminList: state.admin.adminList,
  }
}
const mapDispatchToProps = {
  // push: routerRedux.push,
  getAdminInfo: query => ({
    type: 'admin/getAdminInfo',
    payload: query || {},
  }),
  postManage: query => ({
    type: 'admin/postManage',
    payload: query || {},
  }),
  reviewManage: query => ({
    type: 'admin/reviewManage',
    payload: query || {},
  }),
  modifyAdmin: query => ({
    type: 'admin/modifyAdmin',
    payload: query || {},
  }),
  uploadAvatar: query => ({
    type: 'admin/uploadAvatar',
    payload: query || {},
  }),
  adminManage: query => ({
    type: 'admin/adminManage',
    payload: query || {},
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class AdminManage extends Component {
  state = {
    key: '1'
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      key: e.key
    })
  };

  render() {
    const { key } = this.state

    return (
      <div className={styles.amWrapper}>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          mode="inline"
        >
          <Menu.Item key="1">个人信息管理</Menu.Item>
          <Menu.Item key="2">帖子管理</Menu.Item>
          <Menu.Item key="3">评论管理</Menu.Item>
          <Menu.Item key="4">管理员管理</Menu.Item>
          <Menu.Item key="5">十大景点管理</Menu.Item>
        </Menu>
        <div className={styles.amRight}>
          {
            key == 1 ? <AdminInfo {...this.props} />
              : (key == 2 ? <PostInfo {...this.props} />
                : (key == 3 ? <ReviewInfo {...this.props} /> : (key == 4 ? <ChildManage {...this.props} />
                  : '')))
          }
        </div>
      </div>
    )
  }
}
export default AdminManage