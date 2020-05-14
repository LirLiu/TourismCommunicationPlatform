import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva'
import Link from 'umi/link'
import router from 'umi/router'
const mapStateToProps = state => ({
  recommendList: state.post.recommendList,
  viewsIncrease: state.post.viewsIncrease,

});

const mapDispatchToProps = {
  getRecommendList: query => ({
    type: 'post/getRecommendList',
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
class DynamicArticle extends Component {

  componentDidMount() {
    const { getRecommendList } = this.props
    getRecommendList()
  }
  handleLink = (id, type, views) => {
    const { getViewsIncrease } = this.props
    let newViews = Number(views) + 1;
    const params = { id: id, views: newViews }
    getViewsIncrease({ data: params })
    if (type == '0') {
      router.push(`/post/detail/${id}`)
    } else if (type == '1') {
      router.push(`/article/detail/${id}`)
    } else if (type == '2') {
      router.push(`/partner/detail/${id}`)
    } else if (type == '3') {
      router.push(`/faqs/detail/${id}`)
    }
  }
  render() {
    const { recommendList } = this.props;
    return (
      <div className={styles.dynamicArticle}>
        {
          recommendList.map((item, index) => {
            return (
              <div className={styles.daWrapper} key={index}>
                <div className={`${item.p_cover ? styles.daLeftWrapper : styles.daLeWrapper}`}>
                  <a className={styles.daLink}>{item.p_title}</a>
                  <p dangerouslySetInnerHTML={{ __html: item.p_content.slice(0, 50) }}></p>
                </div>
                <div className={styles.daRightWrapper}>
                  {
                    item.p_cover ? (<div><img src={item.p_cover} alt='封面图片' /></div>) : ''
                  }
                  <a onClick={this.handleLink.bind(null, item.p_id, item.p_type, item.p_views)}>{`查看详情 >`}</a>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default DynamicArticle;