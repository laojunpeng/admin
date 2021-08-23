import {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Form, Input, Divider } from "antd";

import { SUPPLY_ENUM, ORDER_USER_ENUM, INPUT_ENUM } from "@/assets/enum/order";

const { Item } = Form;
export default ({ id }) => {
  return (
    <>
      <Divider orientation="right" id={id}>
        维修单前置
      </Divider>
      {/* 维修单位 */}
      <ProFormSelect
        width="sm"
        name={ORDER_USER_ENUM.supply}
        label="维修单位"
        valueEnum={SUPPLY_ENUM}
        rules={[{ required: true }]}
      />
      {/* 订单录入 */}
      <ProFormSelect
        width="sm"
        name={ORDER_USER_ENUM.input}
        label="订单录入"
        valueEnum={INPUT_ENUM}
        rules={[{ required: true }]}
      />
      {/* sn设备号 */}
      <ProFormText
        width="md"
        name={ORDER_USER_ENUM.deviceSn}
        label="sn/设备号"
        rules={[{ required: true }]}
      />
      {/* 客服备注 */}
      <ProFormTextArea
        name={ORDER_USER_ENUM.remark}
        label="客服备注"
        width="lg"
      />
    </>
  );
};
