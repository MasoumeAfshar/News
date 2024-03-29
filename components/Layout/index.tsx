import { ReactNode } from 'react';
import { Layout } from 'antd';
import styles from './layout.module.scss'

const { Content } = Layout;

interface IDashboardLayout {
  children: ReactNode;
}
const MainLayout =({ children }: IDashboardLayout)=>{
  return (
    <Layout className={styles.main_layout}>
      <Content>{children}</Content>
    </Layout>
  )
}
export default MainLayout;