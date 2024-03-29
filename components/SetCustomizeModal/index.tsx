import {
  Form,
  Button,
  Modal,
  Row,
  Col,
  Checkbox,
  Divider,
} from "antd";
import { useState, useImperativeHandle } from "react";
import styles from "../Layout/layout.module.scss";
import messages from "../Layout/messages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { saveParams } from '../../redux/searchSlice';
import { useRouter } from "next/router";

const CheckboxGroup = Checkbox.Group;
const SourceOptions = ["New york times", "Guardian", "NewsApi"];
const CatOptions = ["sports", "arts", "technology", "business", "football"];

const SetCustomizeModal = ({ reference }) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedValue = useAppSelector((state: any) => state.search);
  const [form] = Form.useForm();

  const dispatch = useAppDispatch();

  useImperativeHandle(reference, () => ({
    showModal: () => {
      setIsModalOpen(true);
    },
    hideModal: () => {
      setIsModalOpen(false);
    },
  }));

  const handleOk = (values) => {
    dispatch(saveParams({source : values.sources, cat : values.category}))

    setIsModalOpen(false);
      router.push({
        pathname: "/customizeNews",
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={messages.modalTitle}
      open={isModalOpen}
      onCancel={handleCancel}
      className={styles.newsFeed}
      width={700}
      footer={null}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        className={styles.newsFeedForm}
        initialValues={{category:selectedValue.cat,sources: selectedValue.source}}
        onFinish={handleOk}
      >
        <Row>
          <Col xs={24} className="">
            <Form.Item
              label={"select sources :"}
              labelCol={{ xs: 24 }}
              wrapperCol={{ xs: 24 }}
              name="sources"
            >
              <CheckboxGroup
                options={SourceOptions}
              />
            </Form.Item>
          </Col>
          <Divider />
          <Col xs={24} className="">
            <Form.Item
              label={"select categories :"}
              labelCol={{ xs: 24 }}
              wrapperCol={{ xs: 24 }}
              name="category"
            >
              <Checkbox.Group
                options={CatOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} className={styles.formButton}>
            <Button
              key="back"
              type="text"
              className={styles.green_button_text}
              onClick={handleCancel}
              htmlType="reset"
            >
              {messages.Cancle}
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              className={styles.green_button}
            >
              {messages.save} and view your list
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default SetCustomizeModal;
