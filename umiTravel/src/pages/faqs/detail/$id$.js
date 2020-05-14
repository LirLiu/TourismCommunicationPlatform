import React, { Component } from 'react';
import { Button, Divider } from 'antd';
import BreadCrumbs from '@/components/Common/BreadCrumbs'
import RemarkOn from '@/components/Common/RemarkOn'
import styles from './index.less'
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { connect } from 'dva'
import router from 'umi/router'
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
class FaqDetail extends Component {

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
  handleReview = () => {
    router.push('/release')
  }
  render() {
    const { postDetail } = this.props

    const showBread = {
      mark: '问答',
      markTag: postDetail.p_tags,
      markTitle: postDetail.p_title
    }
    return (
      <div className={styles.faqDetail}>
        <div className={styles.fdWrapper}>
          <BreadCrumbs showBreadHead={showBread} />
          <div className={styles.fdQuestion}>
            <div>
              <h3 style={{ textAlign: 'center' }}>{postDetail.p_title}</h3>
              <i style={{ fontSize: '12px', marginLeft: 30 }}>{postDetail.u_name} &nbsp;{conversion(postDetail.p_create)}</i>
              <p dangerouslySetInnerHTML={{ __html: postDetail.p_content }}></p>
              <span><MessageOutlined />{Number(postDetail.p_comments)}回答</span>
              <span><EyeOutlined />{Number(postDetail.p_views)}浏览</span>
              <Divider style={{ height: '3px' }} />
            </div>
            <div>
              <Button onClick={this.handleReview}>我要提问</Button>
              <Button>我要回答</Button>
            </div>
          </div>
          <RemarkOn {...this.props} />
        </div>
      </div>
    );
  }
}
export default FaqDetail;