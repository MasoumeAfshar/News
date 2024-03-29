import {
  Col,
  Row,
  Checkbox,
  Divider,
  CheckboxProps,
  GetProp,
  Dropdown,
} from "antd";

import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import styles from "./search.module.scss";

type CheckboxValueType = GetProp<typeof Checkbox.Group, "value">[number];
const CheckboxGroup = Checkbox.Group;
const SourceOptions = ["New york times", "Guardian", "NewsApi"];
const CatOptions = ["sports", "arts", "technology", "business", "football"];

const SearchFilter = ({}: // data,
// nobtn = false,
{
  // data: any;
  // nobtn?: boolean;
}) => {
  const router = useRouter();
  const { query } = useRouter();
  const { q, source, cat, fromDate } = query;
  const [sources, setSources] = useState<CheckboxValueType[]>([]);
  const [categories, setCategories] = useState<CheckboxValueType[]>([]);
  const [startDate, setStartDate] = useState<string>(
    Array.isArray(fromDate) ? fromDate[0] : fromDate || ""
  );
  const checkAll = SourceOptions.length === sources.length;

  const dateFormat = "YYYY-MM-DD";
  const todayDate = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (source) setSources(Array.isArray(source) ? source : [source]);
    if (cat) setCategories(Array.isArray(cat) ? cat : [cat]);
  }, []);

  useEffect(() => {
    filterDataAction();
  }, [startDate, sources, categories]);

  const filterDataAction = () => {
    const filterParams: { [key: string]: string | string[] } = {
      q: q,
    };

    startDate.length > 0 &&
      (filterParams.fromDate = encodeURIComponent(startDate));

    sources.length > 0 &&
      (filterParams.source = sources.map((source) =>
        encodeURIComponent(source)
      ));

    categories.length > 0 &&
      (filterParams.cat = categories.map((cat) => encodeURIComponent(cat)));

    const queryString = Object.keys(filterParams)
      .map((key) => `${key}=${filterParams[key]}`)
      .join("&");
    router.push(`${router.pathname}?${queryString}`);
  };

  const onChangeDate: DatePickerProps["onChange"] = (
    date,
    dateString: string
  ) => {
    setStartDate(dateString);
  };

  const onChangeSource = (list: CheckboxValueType[]) => {
    setSources(list);
  };

  const onCheckAllSource: CheckboxProps["onChange"] = (e) => {
    setSources(e.target.checked ? SourceOptions : []);
  };

  const onChangeCat: GetProp<typeof Checkbox.Group, "onChange"> = (
    catValue
  ) => {
    setCategories(catValue);
  };

  return (
    <div>
      <Row>
        <Col lg={12} md={24} xs={24}>
          <Row align={"middle"} justify={{lg:"start",  md: "center" }}>
            <Col span={4} xs={24} md={{ span: 6, offset: 0 }}>
              <DatePicker
                defaultValue={dayjs(
                  startDate ? startDate : todayDate,
                  dateFormat
                )}
                onChange={onChangeDate}
                className={styles.datePicker}
              />
            </Col>
            <Col span={4}  xs={24} md={{ span: 6, offset: 2 }}>
              <Dropdown
                trigger={["click"]}
                dropdownRender={(menu) => (
                  <>
                    <Checkbox onChange={onCheckAllSource} checked={checkAll}>
                      Check all
                    </Checkbox>
                    <CheckboxGroup
                      name="source"
                      options={SourceOptions}
                      value={sources}
                      onChange={onChangeSource}
                    />
                  </>
                )}
              >
                <div className={styles.filtertitle}>
                  source <DownOutlined />
                </div>
              </Dropdown>
            </Col>
            <Col span={4} xs={24} md={{ span: 6, offset: 2 }}>
              <Dropdown
                trigger={["click"]}
                dropdownRender={(menu) => (
                  <Checkbox.Group
                    name="category"
                    options={CatOptions}
                    onChange={onChangeCat}
                  />
                )}
              >
                <div className={styles.filtertitle}>
                  category <DownOutlined />
                </div>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFilter;
