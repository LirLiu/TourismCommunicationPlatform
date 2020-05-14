import React, { Component } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons';
import styles from './index.less';
import router from 'umi/router';

export default class ColumnList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        }
    }
    routeGo = (index) => {
        if (index == 3) {
            router.push({ path: '/article', target: '_blank' });
        } else if (index == 4) {
            router.push('/faqs')
        } else if (index == 1) {
            router.push('/post')
        } else if (index == 2) {
            router.push('/partner')
        } else if (index == 5) {
            router.push('/other')
        }
    }
    render() {
        const list = ['推荐', '分享帖', '约伴', '游记', '问答', '其他'];

        return (
            <div className={styles.columnList}>
                <div>
                    <div>
                        <ul>
                            {
                                list.map((item, index) => {
                                    return (
                                        <a key={index} onClick={this.routeGo.bind(null, index)}><li className={`${this.state.currentIndex == index ? styles.clActive : ''}`}>{item}</li></a>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        <span>你<br />将<br />航<br />向<br />"<br />星<br />辰<br />大<br />海<br />"<br /><UnorderedListOutlined /></span>
                    </div>
                </div>
            </div>
        )
    }

}
