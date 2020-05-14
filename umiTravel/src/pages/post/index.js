// 帖子列表页面
import React, { Component } from 'react'
import ChildHead from '@/components/Common/ChildHead'
import styles from './index.less';
import { Button, Divider, Tabs, Pagination } from 'antd';
import ListModule from './components/listModule'
import { FormOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import Link from 'umi/link'

const { TabPane } = Tabs;

const mapStateToProps = (state, ownProps) => {
  return {
    postList: state.post.postList,
  }
}
const mapDispatchToProps = {
  // push: routerRedux.push,
  getPostList: query => ({
    type: 'post/getPostList',
    payload: query || {},
    // loading: true,
  }),
  getViewsIncrease: query => ({
    type: 'post/getViewsIncrease',
    payload: query || {},
    // loading: true,
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class ForumPosts extends Component {
  state = {
    list: []
  }
  componentDidMount() {
    const { getPostList } = this.props
    const params = { type: 0, sign: 0 }
    getPostList(params)
  }
  callback = (key) => {
    const { getPostList } = this.props
    if (key == 1) {
      const params = { type: 0, sign: 0 }
      getPostList(params)
    } else if (key == 2) {
      const params = { type: 0, sign: 1 }
      getPostList(params)
    } else if (key == 3) {
      const params = { type: 0, sign: 2 }
      getPostList(params)
    }
  }
  render() {
    const { postList } = this.props
    return (
      <div className={styles.forumPosts}>
        <ChildHead showHeadPane={{ alb: false, sign: '分享帖', subSign: '独乐乐乎，哪如众乐乐' }} />
        <div className={styles.fpWrapper}>
          <div className={styles.fqSend}>
            <Button><Link to={`/release`}> <FormOutlined />发新贴</Link></Button>
            <Pagination className={styles.fqPagination} size="small" total={postList.length + 1} />
            <Divider />
          </div>
          <Tabs onChange={this.callback} type="card">
            <TabPane tab="全部" key="1">
              <ListModule {...this.props} />
            </TabPane>
            <TabPane tab="优质" key="2">
              <ListModule {...this.props} />
            </TabPane>
            <TabPane tab="热门" key="3">
              <ListModule {...this.props} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default ForumPosts