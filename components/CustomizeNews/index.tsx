import { Col, Row } from "antd";
import styles from "./customize.module.scss";
import HeaderBox from "../Layout/HeaderBox";
import messages from "./messages";
import {
  useGetGuardianNewsQuery,
  useGetNytimesNewsQuery,
  useGetNewsAPIListQuery,
} from "../../api/news";
import NewsItem from "../NewsList/NewsItem";
import { useAppSelector } from "../../redux";

const CustomizeNews = () => {

  const queryParams = useAppSelector((state: any) => state.search);

  const { data: newsAPI } = useGetNewsAPIListQuery({
    category: queryParams.cat,
  });

  const { data: GuardianNews } = useGetGuardianNewsQuery({
    section: queryParams.cat,
  });

  const { data: NytimesNews } = useGetNytimesNewsQuery({
    fq: queryParams.cat,
  });

  const data = []
    .concat(newsAPI?.results, GuardianNews?.results, NytimesNews?.results)
    .filter((item) => item !== undefined);

  return (
    <>
      <HeaderBox title={messages.searchTitle} />
      <Row>
        <div className="container">
          <Col span={24} className={`${styles.mt32}`}>
            {data?.map((item, index) => {
              return <NewsItem key={`news_${index}`} data={item} />;
            })}
          </Col>
        </div>
      </Row>
    </>
  );
};
export default CustomizeNews;
