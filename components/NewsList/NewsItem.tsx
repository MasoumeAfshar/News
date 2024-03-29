import { Col, Row, Typography, Divider, Button, Image } from "antd";
import styles from "./newsList.module.scss";
import messages from "./messages";
import dayjs from "dayjs";

const { Paragraph, Text } = Typography;

const NewsItem = ({
  data,
}: {
  data: any;
}) => {
  return (
    <div className={styles.boxItem}>
      <Row>
        <Col span={24} className={styles.itemHeader}>
          <Row>
            <Col span={16} xs={24}>
              <Text className={styles.itemTitle}> {data?.author}</Text>
              -
              <Text className={styles.itemTitle}>{data?.title}</Text>
            </Col>
            <Col span={8} xs={24}className={styles.dateTime}>
              <Text className={styles.dateTime_lable}>
                {messages.Hour} :
                <span className={styles.dateTime_value}>
                  {dayjs(data?.publishedAt).format('HH:mm')}
                </span>
              </Text>
              <Divider type="vertical" />
              <Text className={styles.dateTime_lable}>
                {messages.Date} :
                <span className={styles.dateTime_value}>
                  {dayjs(data?.publishedAt).format('YYYY/MM/DD')}
                </span>
              </Text>
            </Col>
          </Row>
        </Col>
        <Col span={24} className={styles.itemContent}>
          <Row className={styles.content} justify={"space-between"}>
            <Col span={18} md={16} xs={24}>
              <Paragraph>{data?.des}</Paragraph>
            </Col>
            <Col span={6} md={8} xs={24} className={styles.contentImg}>
              <Image width={237} src={data?.img} />
            </Col>
          </Row>
          <Button className={styles.green_button_border} disabled>
              {messages.ViewDeials}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default NewsItem;
