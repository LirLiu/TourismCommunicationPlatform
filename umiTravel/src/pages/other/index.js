// 其他页面
import React, { Component } from 'react'
import ChildHead from '@/components/Common/ChildHead'
import Area from '@/components/Common/Area'
import ScenicSpot from './components/scenicSpot'
import WebAbout from './components/webAbout'
import styles from './index.less'
import { connect } from 'dva'

const mapStateToProps = (state, ownProps) => {
  return {
    postList: state.post.postList
  }
}

const mapDispatchToProps = {
  // push: routerRedux.push,
  getOtherList: query => ({
    type: 'post/getOtherList',
    payload: query || {},
    // loading: true,
  }),
  getSearchTags: query => ({
    type: 'post/getSearchTags',
    payload: query || {},
    // loading: true,
  }),
}
@connect(mapStateToProps, mapDispatchToProps)
class InAddition extends Component {

  componentDidMount() {
    const { getOtherList } = this.props
    const params = { area: '安徽' }
    getOtherList(params)
  }
  render() {
    return (
      <div className={styles.inAddition}>
        <ChildHead showHeadPane={{ alb: false, sign: '其他', subSign: '谁言畏暖三春寒，恰逢佳时酒色观' }} />
        <div className={styles.iaWrapper}>
          <Area {...this.props} />
          <ScenicSpot {...this.props} />
          <WebAbout {...this.props} />
        </div>
      </div>
    )
  }
}

export default InAddition