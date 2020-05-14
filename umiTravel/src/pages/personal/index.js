// 个人信息页面
import React, { Component } from 'react'
import styles from './index.less'
import { Avatar, Divider } from 'antd';
import BasicInfo from './components/basicInfo'
import PostInfo from './components/postInfo'
import ReviewInfo from './components/reviewInfo'
import AccountManage from './components/accountManage'
import { connect } from 'dva'
import router from 'umi/router'
const menu = ['基本信息', '帖子管理', '评论管理', '账户管理'];

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.user.userInfo,
    userPost: state.user.userPost,
    userReview: state.user.userReview,
  }
}

const mapDispatchToProps = {
  // push: routerRedux.push,
  getUserInfo: query => ({
    type: 'user/getUserInfo',
    payload: query || {},
    // loading: true,
  }),
  getUserPost: query => ({
    type: 'user/getUserPost',
    payload: query || {},
    // loading: true,
  }),
  getUserReview: query => ({
    type: 'user/getUserReview',
    payload: query || {},
    // loading: true,
  }),
  deleteUserElse: query => ({
    type: 'user/deleteUserElse',
    payload: query || {},
    // loading: true,
  }),
  modifyUser: query => ({
    type: 'user/modifyUser',
    payload: query || {},
    // loading: true,
  }),
  upload: query => ({
    type: 'user/upload',
    payload: query || {},
    // loading: true,
  }),
  getViewsIncrease: query => ({
    type: 'post/getViewsIncrease',
    payload: query || {},
    // loading: true,
  }),
}
class PersonalInfo extends Component {
  state = {
    basicIndex: 0
  }

  componentDidMount() {
    const { getUserInfo, getUserPost, getUserReview } = this.props
    let session = sessionStorage.getItem('account')
    const params = { account: session, mark: 0 }
    getUserInfo(params)
    getUserPost(params)
    getUserReview(params)
  }
  handleMenuChange = (index) => {
    this.setState({
      basicIndex: index
    })
    const { getUserInfo, getUserPost, getUserReview } = this.props
    let session = sessionStorage.getItem('account')
    if (index == 0) {
      const params = { account: session, mark: 0 }
      getUserInfo(params)
      getUserPost(params)
      getUserReview(params)
    } else if (index == 1) {
      const params = { account: session, mark: 1 }
      getUserPost(params)
    } else if (index == 2) {
      const params = { account: session, mark: 1 }
      getUserReview(params)
    } else if (index == 3) {
      const params = { account: session }
      getUserInfo(params)
    }
  }
  render() {
    const { userInfo } = this.props
    const { basicIndex } = this.state
    return (
      <div className={styles.personalInfo}>
        <div className={styles.piHeadBg} />
        <div className={styles.piWrapper}>
          <div>
            <div className={styles.piHeadName}>
              <span>{userInfo.u_name}</span>
              <span>每一朵花开，都是为了另一次绽放</span>
            </div>
            <div className={styles.piHeadAvatar}>
              <Avatar shape="square" size={120} src={userInfo.u_avatar} />
            </div>
          </div>

          <div>
            <div className={styles.piModule}>
              <ul>
                {
                  menu.map((item, index) => <li key={index} onClick={this.handleMenuChange.bind(null, index)}><a>{item}</a></li>)
                }
              </ul>
            </div>
            <div className={styles.piContent}>
              {
                basicIndex == 0 ? <BasicInfo {...this.props} /> : (basicIndex == 1 ? <PostInfo {...this.props} /> : (basicIndex == 2 ? <ReviewInfo {...this.props} /> : (basicIndex == 3 ? <AccountManage {...this.props} /> : '')))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)