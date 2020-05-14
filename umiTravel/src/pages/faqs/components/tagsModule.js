import React, { Component } from 'react'
import { Tag } from 'antd';
import styles from '../index.less'
import { ArrowsAltOutlined, ShrinkOutlined } from '@ant-design/icons';


export default class TagsModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      version: false,
    }
  }
  handleChange = (version) => {
    this.setState({
      version: !version,
    });
  }
  handleTagsSearch = (val) => {
    if (val == '全部') {
      val = ''
    }
    const { getSearchTags } = this.props
    let params = { type: 3, tag: val, sign: 0 }
    getSearchTags(params)
  }
  render() {
    const { version } = this.state;
    const tags = ['全部', '户外','旅行', '登山', '攀岩','徒步', '钓鱼', '骑行', '滑雪', '登山', '越野', '自驾游','其他'];

    return (
      <div className={styles.tagsModule}>
        {
          tags.map((item, index) => <Tag key={index} onClick={this.handleTagsSearch.bind(null, item)}>{item}</Tag>)
        }
        <div>
          <p onClick={this.handleChange.bind(null, version)}>
            {
              version === false ? <span><ArrowsAltOutlined />展开</span> : <span><ShrinkOutlined />收起</span>
            }
          </p>
        </div>
      </div>
    );
  }
}