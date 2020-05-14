// 游记页面
import React, { Component } from 'react';
import { List, Avatar, Tag, Row, Col } from 'antd';
import styles from './index.less';
import ChildHead from '@/components/Common/ChildHead';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import router from 'umi/router';
import Link from 'umi/link'
import { connect } from 'dva'
import functionCommon from '@/components/Common/FunctionCommon'
const { delNbsp, conversion } = functionCommon

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const mapStateToProps = (state, ownProps) => {
  return {
    postList: state.post.postList,
    viewsIncrease: state.post.viewsIncrease,
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
class TravelNotes extends Component {

  state = {
    version: 0
  }
  componentDidMount() {
    const { getPostList } = this.props
    const params = { type: 1, sign: 0 }
    getPostList(params)
  }
  handleMenusChange = (key) => {
    this.setState({
      version: key
    })
    const { getPostList } = this.props
    if (key == 0) {
      const params = { type: 1, sign: 0 }
      getPostList(params)
    } else if (key == 1) {
      const params = { type: 1, sign: 1 }
      getPostList(params)
    } else if (key == 2) {
      const params = { type: 1, sign: 2 }
      getPostList(params)
    }
  }
  handleViewsIncrease = (id, views) => {
    const { getViewsIncrease } = this.props
    let newViews = Number(views) + 1;
    const params = { id: id, views: newViews }
    getViewsIncrease({ data: params })
  }
  render() {
    const { postList } = this.props
    const { version } = this.state
    const menus = ['全部', '优质文章', '热门游记']
    const listData = postList.map((item, index) => {
      return {
        key: index,
        title: item.p_title,
        id: item.p_id,
        createTime: item.p_create,
        views: item.p_views,
        comments: item.p_comments,
        avatar: item.u_avatar,
        cover: item.p_cover,
        description: <div><Tag style={{ marginRight: 10 }}>{item.p_tags}</Tag>{item.u_name}</div>,
        content: item.p_content.slice(0, 120),
      }
    })

    return (
      <div className={styles.travelNotes} >
        <ChildHead showHeadPane={{ alb: true, sign: '游记攻略', subSign: '万水千山书中阅，锦绣山河掌上观', alButton: '写游记' }} />
        <div className={styles.notesWrapper}>
          <Row className={styles.nwHead}>
            {
              menus.map((item, index) => <Col className={`${version == index ? styles.nwActive : ''}`} style={{ cursor: 'pointer' }} span={8} key={index} onClick={this.handleMenusChange.bind(null, index)}>{item}</Col>)
            }
          </Row>
          <List
            className={styles.noteList}
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 10,
            }}
            dataSource={listData}
            renderItem={item => (
              <List.Item
                onClick={this.handleViewsIncrease.bind(null, item.id, item.views)}
                key={item.title}
                actions={[
                  <span>{conversion(item.createTime)}</span>,
                  <IconText icon={StarOutlined} text={Number(item.views)} key="list-vertical-star-o" />,
                  <IconText icon={MessageOutlined} text={Number(item.comments)} key="list-vertical-message" />,
                ]}
                extra={
                  item.cover ? <img width={272} height={168} alt="封面图片" src={item.cover} /> : ''
                }
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Link to={`/article/detail/${item.id}`}>{item.title}</Link>}
                  description={item.description}
                />
                <div>
                  <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }
}

export default TravelNotes
