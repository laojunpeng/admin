import {
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormDigit,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Divider } from "antd";
import {
  ORDER_RECEIVE_ENUM,
  MACHINE_INSPECTOR_ENUM,
  ORDER_CHECK_ENUM,
  MACHINE_APPEARANCE_ENUM,
  MACHINE_BAD_DESC_ENUM,
  MACHINE_BAD_TYPE_ENUM,
} from "@/assets/enum/order";

export default ({ id }) => {
  return (
    <>
      <Divider id={id} orientation="right">
        检测情况
      </Divider>
      {/* 检测人 */}
      <ProFormSelect
        name={ORDER_RECEIVE_ENUM.inspector}
        width="xs"
        label="检测人"
        valueEnum={MACHINE_INSPECTOR_ENUM}
      />
      {/* 外观检测 */}
      <ProFormRadio.Group
        name={ORDER_CHECK_ENUM.appearance}
        label="外观检测"
        valueEnum={MACHINE_APPEARANCE_ENUM}
        rules={[{ required: true }]}
      />
      {/* 实际不良描述 */}
      <ProFormSelect
        mode="multiple"
        name={ORDER_CHECK_ENUM.badMachineDesc}
        label="实际不良描述"
        valueEnum={MACHINE_BAD_DESC_ENUM}
        width="lg"
        rules={[{ required: true }]}
      />
      {/* 不良类型 */}
      <ProFormSelect
        mode="multiple"
        name={ORDER_CHECK_ENUM.badMachineType}
        label="不良类型"
        valueEnum={MACHINE_BAD_TYPE_ENUM}
        width="lg"
        rules={[{ required: true }]}
      />
      {/* 检测时间 */}
      <ProFormDatePicker
        name={ORDER_CHECK_ENUM.checkDate}
        label="检测时间"
        width="sm"
      />
      {/* 维修费用 */}
      <ProFormDigit name={ORDER_CHECK_ENUM.cost} label="维修费用" width="sm" />
    </>
  );
};
