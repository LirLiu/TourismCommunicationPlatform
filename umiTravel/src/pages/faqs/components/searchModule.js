import React from 'react'
import styles from '../index.less';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input;
export const SearchModule = (props) => {
  const handleSearch = (val) => {
    let params = { type: 3, tag: val, sign: 0 }
    props.getSearchTags(params)
  }
  return (
    <div className={styles.searchModule}>
      <Search
        placeholder="搜索你想问的问题"
        enterButton="搜索"
        size="large"
        prefix={<SearchOutlined />}
        onSearch={handleSearch}
      />
    </div>
  )
}

export default SearchModule