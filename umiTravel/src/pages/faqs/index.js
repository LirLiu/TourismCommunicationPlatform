// 问答页面
import React, { Component } from 'react'
import styles from './index.less';
import ChildHead from '@/components/Common/ChildHead';
import SearchModule from './components/searchModule'
import ResultModule from './components/resultModule'
import TagsModule from './components/tagsModule'
import AskModule from './components/askModule'
import WaitQuestion from './components/waitQuestion'
import { connect } from 'dva'

const mapStateToProps = (state, ownProps) => {
  return {
    postList: state.post.postList,
    zeroList: state.post.zeroList,

  }
}
const mapDispatchToProps = {
  // push: routerRedux.push,
  getPostList: query => ({
    type: 'post/getPostList',
    payload: query || {},
    // loading: true,
  }),
  getSearchTags: query => ({
    type: 'post/getSearchTags',
    payload: query || {},
    // loading: true,
  }),
  getViewsIncrease: query => ({
    type: 'post/getViewsIncrease',
    payload: query || {},
    // loading: true,
  }),
  getZeroAnswer: query => ({
    type: 'post/getZeroAnswer',
    payload: query || {},
    // loading: true,
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class QuestionAnswer extends Component {

  componentDidMount() {
    const { getPostList, getZeroAnswer } = this.props
    const params = { type: 3, sign: 0 }
    getPostList(params)
    getZeroAnswer()
  }
  render() {
    return (
      <div className={styles.questionAnswer} >
        <ChildHead showHeadPane={{ alb: false, sign: '问答', subSign: '书中难解心头惑，人言可暖叁月寒' }} />
        <div className={styles.qaWrapper}>
          <div className={styles.qaLeft}>
            <SearchModule {...this.props} />
            <TagsModule {...this.props} />
            <ResultModule {...this.props} />
          </div>
          <div className={styles.qaRight}>
            <AskModule />
            <WaitQuestion {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}
export default QuestionAnswer