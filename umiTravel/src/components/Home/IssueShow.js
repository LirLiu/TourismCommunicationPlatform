import React, { Component } from 'react';
import { Button, Card } from 'antd';
import styles from './index.less';
import router from 'umi/router'
export default class IssueShow extends Component {

  handleReleaseGo = () => {
    router.push('/release')
  }
  render() {
    return (
      <div className={styles.issueShow}>
        <Button onClick={this.handleReleaseGo}>发布</Button>
        <Card size="small" title="每日一景" extra={<a href="/other"> >> </a>} style={{ width: 300, marginTop: 30, marginLeft: -20 }}>
          <div className={styles.isImg}><img src='https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3813023185,2817663189&fm=26&gp=0.jpg' /></div>
          <div className={styles.isWord}>
            <h3>黄山</h3>
            <p>世界文化与自然双重遗产，世界地质公园，国家AAAAA级旅游景区。</p>
            <p>黄山位于安徽省南部黄山市境内，有72峰，主峰莲花峰海拔1864米，与光明顶、天都峰并称三大黄山主峰，为36大峰之一。</p>
            <p>黄山原名“黟山”，因峰岩青黑，遥望苍黛而名。后因传说轩辕黄帝曾在此炼丹，故改名为“黄山”。黄山代表景观有“四绝三瀑”，四绝：奇松、怪石、云海、温泉；三瀑：人字瀑、百丈泉、九龙瀑。</p>
          </div>
        </Card>
      </div>
    )
  }
}