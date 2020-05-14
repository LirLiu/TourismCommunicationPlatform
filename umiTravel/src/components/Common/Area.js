import React, { Component } from 'react';
import styles from './index.less';

export default class Area extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkSign: ''
    }
  }

  handleLinkChange = (area, tag, areaSign) => {
    this.setState({
      linkSign: area
    })
    const { getSearchTags } = this.props
    if (areaSign) {
      const params = { sign: 1, type: 2, tag: tag, area: area }
      getSearchTags(params)
    } else {
      const params = { sign: 2, area: area }
      getSearchTags(params)
    }
  }
  render() {
    const { tags, areaSign } = this.props
    const { linkSign } = this.state
    const province = ['北京  ', '安徽  ', '重庆  ', '福建  ', '甘肃  ', '广东  ', '广西  ', '贵州  ', '海南  ', '河北  ', '河南  ', '湖北  ', '湖南  ', '黑龙江', '吉林  ', '江苏  ', '江西  ', '辽宁  ', '内蒙古', '宁夏  ', '青海  ', '山东  ', '山西  ', '陕西  ', '上海  ', '四川  ', '天津  ', '新疆  ', '云南  ', '浙江  '];

    return (
      <div className={styles.area}>
        <dl>
          <dt>区域</dt>
          <dd>
            {
              province.map((item, index) => <a className={`${tags == '' ? styles.areaLink : (linkSign == item ? styles.linkActive : styles.areaLink)}`} key={index} onClick={this.handleLinkChange.bind(null, item, tags, areaSign)}>{item}</a>)
            }
          </dd>
        </dl>
      </div>
    );
  }
}