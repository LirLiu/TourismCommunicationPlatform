// 分享帖详情页面
import React, { Component } from 'react';
import { Button, Divider } from 'antd';
import styles from './index.less';
import BreadCrumbs from '@/components/Common/BreadCrumbs'
import ListExtra from './components/listExtra'
import { connect } from 'dva'

const mapStateToProps = (state, ownProps) => {
  return {
    postDetail: state.post.postDetail,
    commentList: state.review.commentList,

  }
}
const mapDispatchToProps = {
  // push: routerRedux.push,
  getPostDetail: query => ({
    type: 'post/getPostDetail',
    payload: query || {},
    loading: true,
  }),
  getCommentList: query => ({
    type: 'review/getCommentList',
    payload: query || {},
    // loading: true,
  }),
}

@connect(mapStateToProps, mapDispatchToProps)

class PostDetail extends Component {

  componentDidMount() {
    const { match: { params: { id } }, getPostDetail, getCommentList } = this.props;
    if (!!id && !isNaN(id)) {
      const params = { postId: id }
      let prams = { account: id }
      getCommentList(prams)
      getPostDetail(params)
    } else {
      // updateRedirectStatus(true);
    }
  }

  render() {
    const { postDetail } = this.props
    const showBread = {
      mark: '分享帖',
      markTag: postDetail.p_tags,
      markTitle: postDetail.p_title
    }
    return (
      <div className={styles.postDetail}>
        <div className={styles.pdWrapper}>
          <BreadCrumbs showBreadHead={showBread} />
          <div className={styles.pdReback}>
            <Button>回复</Button>
          </div>
          <div className={styles.pdUpper}>
            <h1>{postDetail.p_title}</h1>
            <span>查看：{Number(postDetail.p_views)}<Divider type="vertical" />回复：{Number(postDetail.p_comments)}</span>
          </div>
          <ListExtra {...this.props} />
        </div>
      </div>
    );
  }
}
export default PostDetail