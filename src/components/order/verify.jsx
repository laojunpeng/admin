import {
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormDigit,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Divider } from "antd";
import { ORDER_VERIFY_ENUM, ORDER_SPECIAL_ENUM } from "@/assets/enum/order";

export default ({ id }) => {
  return (
    <>
      <Divider id={id} orientation="right">
        支付情况
      </Divider>
      {/* 支付日期 */}
      <ProFormDatePicker
        name={ORDER_VERIFY_ENUM.payDate}
        label="支付日期"
        width="sm"
      />
      {/* 实际支付金额 */}
      <ProFormDigit
        name={ORDER_VERIFY_ENUM.payCost}
        label="实际支付金额"
        width="sm"
        rules={[{ required: true }]}
      />
      {/* 特殊处理结果 */}
      <ProFormSelect
        name={ORDER_VERIFY_ENUM.special}
        label="特殊处理结果"
        valueEnum={ORDER_SPECIAL_ENUM}
        width="lg"
        rules={[{ required: true }]}
      />
    </>
  );
};
