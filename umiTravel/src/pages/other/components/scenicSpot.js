import React, { Component } from 'react';
import styles from '../index.less';
import { Card } from 'antd';
import router from 'umi/router'

class ScenicSpot extends Component {


  handleOtherGO = (url) => {
    const w = window.open('about:blank');
    // 要打开的新页面的url
    w.location.href = `${url}`;

  }
  render() {
    const { postList: list } = this.props
    let scenic;
    const spots = list.map((item, index) => {
      return {
        imgUrl: item.s_cover,
        spotName: item.s_name,
        spotJump: item.s_url,
        spotArea: item.s_area
      }
    })
    if (spots.length == 0) {
      scenic = ''
    } else {
      scenic = spots[0].spotArea
    }
    const gridStyle = {
      width: '20%',
      textAlign: 'center',
    };
    return (
      <div className={styles.scenicSpot}>
        <Card title={scenic + "十大旅游景点"}>
          {
            spots.map((item, index) => {
              return (
                <Card.Grid className={styles.cardGrid} style={gridStyle} onClick={this.handleOtherGO.bind(null, item.spotJump)}>
                  <div><img src={item.imgUrl} alt={item.spotName} /></div>
                  <span>{item.spotName}</span>
                </Card.Grid>
              )
            })
          }
        </Card>
      </div>
    );
  }
}
export default ScenicSpot