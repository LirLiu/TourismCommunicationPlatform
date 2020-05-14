import React from 'react'
import styles from '../index.less';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Link from 'umi/link'

export const AskModule = (props) => {
  return (
    <div className={styles.askModule}>
      <Button><Link to={`/release`}><EditOutlined />我要提问</Link></Button>
    </div>
  )
}

export default AskModule