import { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Space, Row, Col } from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
export default (props) => {
  const [expand, setExpand] = useState(false);
  const getFields = (fields) => {
    if (!fields || fields.length <= 0) {
      return <></>;
    }
    return fields.map(({ options, type, ...componentProps }, index) => {
      if (!expand && index >= 4) {
        return;
      }
      return (
        <Form.Item key={componentProps.name} {...componentProps}>
          {getComponent({ options, type })}
        </Form.Item>
      );
    });
  };
  const getComponent = ({ options, type }) => {
    switch (type) {
      case "select":
        return <Select placeholder="请选择" {...options}></Select>;
      case "date":
        return <DatePicker placeholder="请选择" {...options}></DatePicker>;
      default:
        return <Input placeholder="请输入" {...options} />;
    }
  };
  const fieldsChange = (a, b) => {
    console.log(a, b);
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      layout="inline"
      onFinish={props.onSubmit}
      onFieldsChange={fieldsChange}
    >
      <Space wrap>
        {getFields(props.fields)}
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button>重置</Button>
        <a
          style={{ fontSize: 12 }}
          onClick={() => {
            setExpand(!expand);
          }}
        >
          {expand ? (
            <>
              <UpOutlined />
              收起
            </>
          ) : (
            <>
              <DownOutlined />
              更多
            </>
          )}
        </a>
      </Space>
    </Form>
  );
};
