import styles from './index.less';
import ColumnList from '@/components/Home/ColumnList';
import DynamicArticle from '@/components/Home/DynamicArticle';
import IssueShow from '@/components/Home/IssueShow';

export default () => {
  return (
    <div className={styles.mainPart}>
      <ColumnList />
      <DynamicArticle />
      <IssueShow />
    </div>
  )
}