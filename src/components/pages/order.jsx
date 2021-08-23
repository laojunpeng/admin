import { useState } from "react";
import ProForm from "@ant-design/pro-form";
import { Row, Col, Space, Card, Button, Form, Anchor } from "antd";

import User from "../order/user.jsx";
import Create from "../order/create.jsx";
import Machine from "../order/machine.jsx";
import Recive from "../order/recive.jsx";
import Check from "../order/check.jsx";
import Verify from "../order/verify.jsx";
import Repair from "../order/repair";
import Express from "../order/express";
import Remark from "../order/remark";

import FormContainer from "@/assets/css/components/formContainer.css";

const { Link } = Anchor;
export default () => {
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const submit = () => {
    form.submit();
  };
  const finish = (value) => {
    console.log(value);
  };
  return (
    <Row className={FormContainer.container} gutter={30}>
      <Col flex="auto">
        <ProForm
          form={form}
          scrollToFirstError={true}
          labelAlign="right"
          layout="horizontal"
          labelCol={{ flex: "120px" }}
          omitNil={true}
          submitter={{
            render: () => {
              return;
            },
          }}
          onFinish={finish}
        >
          <Create id="create"></Create>
          <User id="user"></User>
          <Machine id="machine"></Machine>
          <Recive id="recive"></Recive>
          <Check id="check"></Check>
          <Verify id="verify"></Verify>
          <Repair id="repair"></Repair>
          <Express id="express"></Express>
          <Remark id="repairRemark"></Remark>
        </ProForm>
      </Col>
      <Col flex="350px">
        <Space
          direction="vertical"
          style={{ width: "300px", position: "fixed" }}
        >
          <Card hoverable={true}>
            <Anchor targetOffset="40">
              <Link href="#create" title="维修单前置" />
              <Link href="#user" title="用户详情" />
              <Link href="#machine" title="机器详情（客户填写）"></Link>
              <Link href="#recive" title="机器详情（维修员确认）"></Link>
              <Link href="#check" title="检测情况"></Link>
              <Link href="#verify" title="支付情况"></Link>
              <Link href="#repair" title="维修情况"></Link>
              <Link href="#express" title="回寄情况"></Link>
              <Link href="#repairRemark" title="维修备注"></Link>
            </Anchor>
          </Card>
          <Card hoverable={true}>
            <Button onClick={submit} block>
              操作
            </Button>
          </Card>
          <Card hoverable={true}>状态</Card>
        </Space>
      </Col>
    </Row>
  );
};
