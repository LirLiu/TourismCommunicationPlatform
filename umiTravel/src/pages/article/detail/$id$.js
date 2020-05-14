// 游记详情页面
import React, { Component } from 'react';
import styles from './index.less'
import RemarkOn from '@/components/Common/RemarkOn';
import BreadCrumbs from '@/components/Common/BreadCrumbs'
import { connect } from 'dva'
import functionCommon from '@/components/Common/FunctionCommon'
const { delNbsp, conversion } = functionCommon


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
class ArticleDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
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
    const { postDetail: detail } = this.props

    const showBread = {
      mark: '游记攻略',
      markTag: detail.p_tags,
      markTitle: detail.p_title
    }
    return (
      <div className={styles.articleDetail}>
        <div className={styles.adWrapper}>
          <BreadCrumbs showBreadHead={showBread} />
          <div className={styles.adNote}>
            <h1>{detail.p_title}</h1>
            <span>作者：{detail.u_name} 发布时间：{conversion(detail.p_create)}</span>
            <p dangerouslySetInnerHTML={{ __html: detail.p_content }}></p>
          </div>
          <div style={{ width: '100%', height: '60px', background: '#ffffff', marginTop: '20px' }} />
          <div>
            <span style={{ fontSize: '24px' }}>网友评论</span>
            <RemarkOn {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default ArticleDetail;