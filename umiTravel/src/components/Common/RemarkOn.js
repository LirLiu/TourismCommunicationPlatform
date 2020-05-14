import React, { Component } from 'react';
import styles from './index.less'
import { Comment, Avatar, Form, Button, List, Input, Tooltip, Icon } from 'antd';
import { connect } from 'dva'
import functionCommon from '@/components/Common/FunctionCommon'
const { delNbsp, conversion } = functionCommon

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div className={styles.roEditor}>
    <TextArea rows={4} onChange={onChange} value={value} />
    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
      评论
      </Button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = {
  // push: routerRedux.push,
  createReview: query => ({
    type: 'review/createReview',
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
class RemarkOn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      submitting: false,
      value: '',
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { commentList } = nextProps;
    // // 当传入的type发生变化的时候，更新state
    let comments = commentList.map((item, index) => {
      return {
        key: index,
        postId: item.r_post,
        author: item.u_name,
        avatar: item.u_avatar ? item.u_avatar : 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1476501646,2193015135&fm=26&gp=0.jpg',
        content: <p>{item.r_content}</p>,
        datetime: conversion(item.r_create),
      }
    })
    // 当传入的type发生变化的时候，更新state
    if (commentList && comments !== prevState.comments) {
      return {
        comments: comments
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  handleSubmit = (id) => {
    if (!this.state.value) {
      return;
    }
    const { value } = this.state
    const { createReview, getCommentList, getViewsIncrease, getPostDetail } = this.props
    let account = sessionStorage.getItem('account')
    let examine, audit;
    if (value.includes('操')) {
      examine = 0
      audit = 1
    } else {
      examine = 1
    }
    let timestamp = Date.parse(new Date());
    let data = {
      account: account,
      examine: examine,
      audit: audit,
      create: timestamp,
      postId: id,
      content: value
    }
    this.setState({
      submitting: true,
    });
    new Promise((resolve) => {
      const params = { resolve, data }
      if (account) {
        createReview(params)
      } else {
        alert('评论失败，请登录！')
      }
    }).then((res) => {
      alert(res.msg)
      this.setState({
        submitting: false,
        value: '',
      });
      if (res.code == 1000) {
        const params = { account: id }
        getCommentList(params)
      }
      return res;
    }).then((res) => {
      if (res.code == 1000) {
        const { comments } = this.state
        new Promise((resolve) => {
          const data = { sign: 1, count: comments.length + 1, id: id }
          const prams = { resolve, data }
          getViewsIncrease(prams)
        }).then((res) => {
          if (res.code == 1000) {
            const pams = { postId: id }
            getPostDetail(pams)
          }
        })
      }
    })
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;
    const { postDetail } = this.props

    return (
      <div className={styles.remarkOn}>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit.bind(null, postDetail.p_id)}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    );
  }
}
export default RemarkOn;