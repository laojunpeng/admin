import {
  ProFormDatePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormDigit,
  ProFormTextArea,
} from "@ant-design/pro-form";
import { Divider } from "antd";
import {
  ORDER_REPAIR_ENUM,
  MACHINE_INSPECTOR_ENUM,
  MACHINE_PARTS_ENUM,
} from "@/assets/enum/order";

export default ({ id }) => {
  return (
    <>
      <Divider id={id} orientation="right">
        维修情况
      </Divider>
      {/* 实际更换零件 */}
      <ProFormSelect
        mode="multiple"
        width="sm"
        name={ORDER_REPAIR_ENUM.realityParts}
        label="实际更换零件"
        valueEnum={MACHINE_PARTS_ENUM}
      />
      {/* 免费更换零件 */}
      <ProFormSelect
        mode="multiple"
        width="sm"
        name={ORDER_REPAIR_ENUM.freeParts}
        label="免费更换零件"
        valueEnum={MACHINE_PARTS_ENUM}
      />
      {/* 检测人 */}
      <ProFormSelect
        name={ORDER_REPAIR_ENUM.inspector}
        width="xs"
        label="检测人"
        valueEnum={MACHINE_INSPECTOR_ENUM}
      />
    </>
  );
};
