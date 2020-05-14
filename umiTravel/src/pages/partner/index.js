// 约伴页面
import React, { Component } from 'react'
import { Pagination } from 'antd'
import styles from './index.less'
import ChildHead from '@/components/Common/ChildHead'
import Area from '@/components/Common/Area'
import { connect } from 'dva'
import Link from 'umi/link'
import functionCommon from '@/components/Common/FunctionCommon'
const { convers, conversion } = functionCommon

const example = ['全部', '户外', '旅行', '攀岩', '徒步', '钓鱼', '骑行', '滑雪', '登山', '越野', '自驾游', '其他'];

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
}
@connect(mapStateToProps, mapDispatchToProps)
class AboutWith extends Component {
  state = {
    tag: '',
    exampleSign: '全部',
  }

  componentDidMount() {
    const { getPostList } = this.props
    const params = { type: 2, sign: 0 }
    getPostList(params)
  }

  handleTagsChange = (val) => {
    this.setState({
      exampleSign: val
    })
    if (val == '全部') {
      val = ''
    }
    this.setState({
      tag: val
    })
    const { getSearchTags } = this.props
    const params = { sign: 0, type: 2, tag: val }
    getSearchTags(params)
  }

  handleViewsIncrease = (id, views) => {
    const { getViewsIncrease } = this.props
    let newViews = Number(views) + 1;
    const params = { id: id, views: newViews }
    getViewsIncrease({ data: params })
  }

  render() {
    const { postList } = this.props
    const { tag, exampleSign } = this.state
    const areaSign = true
    const pwList = postList.map((item, index) => {
      return {
        id: item.p_id,
        key: index,
        imgUrl: item.p_cover,
        title: item.p_title,
        withStart: item.w_start,
        withEnd: item.w_end,
        phone: item.w_phone,
        views: item.p_views
      }
    })
    return (
      <div className={styles.aboutWith} >
        <ChildHead showHeadPane={{ alb: true, sign: '约伴', subSign: '山水终有尽，友缘意绵绵', alButton: '找伙伴' }} />
        <div className={styles.awWrapper}>
          <Area {...this.props} tags={tag} areaSign={areaSign} />
          <div className={styles.awPane}>
            <ul>
              {
                example.map((item, index) => <li key={index}><a className={`${exampleSign == item ? styles.paneActive : styles.paneLink}`} onClick={this.handleTagsChange.bind(null, item)}>{item}</a></li>)
              }
            </ul>
          </div>
          <div className={styles.awList}>
            {
              pwList.map((item, index) => {
                return (
                  <div
                    className={styles.awBlock}
                    key={index}
                    onClick={this.handleViewsIncrease.bind(null, item.id, item.views)}
                  >
                    <a>
                      <div><img src={item.imgUrl ? item.imgUrl : 'http://image1.8264.com/album/200902/19/16832360_12350473680V5b.jpg'} alt='封面图片' /></div>
                      <div>
                        <h2><Link to={`/partner/detail/${item.id}`} >{item.title ? item.title.slice(0, 6) + '...' : ''}</Link></h2>
                        <span>征集时间：<br />{convers(item.withStart)}&nbsp;~&nbsp;{convers(item.withEnd)}</span>
                        <em>联系电话：<br />{item.phone}</em>
                      </div>
                    </a>
                  </div>
                )
              })
            }
          </div>
          <Pagination style={{ marginTop: 20, textAlign: 'center' }} defaultCurrent={6} pageSize={20} total={postList.length} />        </div>
      </div>
    )
  }
}

export default AboutWith