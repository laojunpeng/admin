import {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
} from "@ant-design/pro-form";
import { Form, Divider, Image, Space } from "antd";

import { ORDER_MACHINE_ENUM, MACHINE_ENUM } from "@/assets/enum/order";

const { Item } = Form;
export default ({ id }) => {
  return (
    <>
      <Divider orientation="right" id={id}>
        机器详情（客户填写）
      </Divider>
      <Item label="机器人ID">123123</Item>
      {/* 维修单位 */}
      <ProFormSelect
        width="sm"
        name={ORDER_MACHINE_ENUM.type}
        label="维修单位"
        valueEnum={MACHINE_ENUM}
      />
      {/* 数量 */}
      <ProFormDigit width="xs" name={ORDER_MACHINE_ENUM.count} label="数量" />
      {/* sn设备号 */}
      <ProFormText
        width="md"
        name={ORDER_MACHINE_ENUM.deviceSn}
        label="sn/设备号"
      />
      {/* 问题描述 */}
      <ProFormTextArea
        name={ORDER_MACHINE_ENUM.description}
        label="问题描述"
        width="lg"
      />
      {/* 描述图片 */}
      <Item label="描述图片">
        <Space>
          <Image
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Image
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Image
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Space>
      </Item>
    </>
  );
};
