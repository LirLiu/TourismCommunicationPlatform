import React from 'react'
import { ConfigProvider, Layout } from 'antd';
import zhCn from 'antd/lib/locale-provider/zh_CN';
import GlobalHeader from '@/components/GlobalHeader/index';
import GlobalFooter from '@/components/GlobalFooter/index';
import styles from './index.less';

const { Header, Content, Footer } = Layout;
export const BasicLayout = (props) => {
  return (
    <ConfigProvider locale={zhCn}>
      {/* <CookiesProvider> */}
      <Layout className={styles.layoutStyle}>
        <Header style={{ padding: '0' }}>
          <GlobalHeader />
        </Header>
        <Content>
          {props.children}
        </Content>
        <Footer style={{ padding: 0, margin: 0 }}>
          <GlobalFooter />
        </Footer>
      </Layout>
      {/* </CookiesProvider> */}
    </ConfigProvider>
  )
}

export default BasicLayout