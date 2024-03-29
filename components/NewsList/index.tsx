import { Col, Row, Input } from "antd";
import styles from "./newsList.module.scss";
import HeaderBox from "../Layout/HeaderBox";
import messages from "./messages";
import NewsItem from "./NewsItem";
import {
  useGetNewsAPIListQuery,
  useGetGuardianNewsQuery,
  useGetNytimesNewsQuery,
} from "../../api/news";

import type { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";

const { Search } = Input;

const NewsList = () => {
  const router = useRouter();

  const onSearch: SearchProps["onSearch"] = (value: string, _e, info) => {
    if (value.length > 3) {
      router.push({
        pathname: "/search",
        query: { q: value },
      });
    }
  };

  const { data: newsAPI } = useGetNewsAPIListQuery({});

  const { data: GuardianNews } = useGetGuardianNewsQuery({});
  const { data: NytimesNews } = useGetNytimesNewsQuery({});

  const data = []
    .concat(newsAPI?.results, GuardianNews?.results, NytimesNews?.results)
    .filter((item) => item !== undefined);

  return (
    <>
      <HeaderBox title={messages.NewsListTitle} />
      <div className="container">
        <Row gutter={{xs: 8, sm: 16, md: 16, lg: 16}}>
          <Col span={24} className={styles.mt32}>
            <Search
              placeholder="search text"
              allowClear
              onSearch={onSearch}
              className={`${styles.searchInput}`}
            />
          </Col>
          <Col span={24} className={`${styles.mt32}`}>
            {data?.map((item, index) => {
              return <NewsItem key={`news_${index}`} data={item} />;
            })}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default NewsList;
