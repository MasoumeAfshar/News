import { Col, Divider, Row, Typography } from "antd";
import styles from "./search.module.scss";
import HeaderBox from "../Layout/HeaderBox";
import messages from "./messages";
import {
  useGetGuardianNewsQuery,
  useGetNewsSearchQuery,
  useGetNytimesNewsQuery,
} from "../../api/news";
import NewsItem from "../NewsList/NewsItem";
import SearchFilter from "./SearchFilter";
import { useRouter } from "next/router";

const { Text } = Typography;

const SearchPage = ({ queryTerm }) => {
  const { query } = useRouter();
  const { fromDate, cat, source } = query;

  const { data: newsAPI } = useGetNewsSearchQuery({
    q: queryTerm,
    from: fromDate,
  });

  const { data: GuardianNews } = useGetGuardianNewsQuery({
    q: queryTerm,
    "from-date": fromDate,
    section: cat,
  });

  const { data: NytimesNews } = useGetNytimesNewsQuery({
    q: queryTerm,
    pub_date: fromDate,
    fq: cat,
  });

  const data = []
    .concat(newsAPI?.results, GuardianNews?.results, NytimesNews?.results)
    .filter((item) => item !== undefined);

  return (
    <>
      <HeaderBox title={messages.searchTitle} />
      <Row>
        <div className="container">
          <Col span={24} className={styles.mt32}>
            <SearchFilter />
          </Col>
          <Divider/>
          <Col span={24} className={styles.mt32}>
            {data?.map((item, index) => {
              return <NewsItem key={`news_${index}`} data={item} />;
            })}
          </Col>
        </div>
      </Row>
    </>
  );
};
export default SearchPage;
