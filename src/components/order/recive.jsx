import {
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormDatePicker,
  ProFormDigit,
} from "@ant-design/pro-form";
import { Divider } from "antd";

import {
  ORDER_RECEIVE_ENUM,
  MACHINE_COLOR_ENUM,
  PACK_PARTS_ENUM,
  MACHINE_BARE_ENUM,
  MACHINE_WARRANTY_ENUM,
  MACHINE_INSPECTOR_ENUM,
} from "@/assets/enum/order";

export default ({ id }) => {
  return (
    <>
      <Divider orientation="right" id={id}>
        机器详情（维修员填写）
      </Divider>
      {/* 机器颜色 */}
      <ProFormSelect
        width="sm"
        name={ORDER_RECEIVE_ENUM.color}
        label="机器颜色"
        valueEnum={MACHINE_COLOR_ENUM}
        rules={[{ required: true }]}
      />
      {/* 缺少配件 */}
      <ProFormSelect
        width="sm"
        name={ORDER_RECEIVE_ENUM.parts}
        label="缺少配件"
        valueEnum={PACK_PARTS_ENUM}
      />
      {/* 是否裸机 */}
      <ProFormRadio.Group
        name={ORDER_RECEIVE_ENUM.bare}
        label="是否裸机"
        valueEnum={MACHINE_BARE_ENUM}
        radioType="button"
        rules={[{ required: true }]}
      />
      {/* 维修编号 */}
      <ProFormText
        name={ORDER_RECEIVE_ENUM.repairId}
        label="维修编号"
        width="lg"
        rules={[{ required: true }]}
      />
      {/* 原sn */}
      <ProFormText name={ORDER_RECEIVE_ENUM.sn} label="原sn" width="lg" />
      {/* 原设备号 */}
      <ProFormText
        name={ORDER_RECEIVE_ENUM.deviceSn}
        label="原设备号"
        width="lg"
      />
      {/* IMEI号 */}
      <ProFormText name={ORDER_RECEIVE_ENUM.imei} label="IMEI号" width="lg" />
      <ProFormDatePicker
        name={ORDER_RECEIVE_ENUM.activeDate}
        label="激活时间"
        width="sm"
      />
      {/* 保修情况 */}
      <ProFormRadio.Group
        name={ORDER_RECEIVE_ENUM.warranty}
        label="保修情况"
        valueEnum={MACHINE_WARRANTY_ENUM}
      />
      {/* 指定检测人 */}
      <ProFormSelect
        name={ORDER_RECEIVE_ENUM.inspector}
        width="xs"
        label="指定检测人"
        valueEnum={MACHINE_INSPECTOR_ENUM}
      />
    </>
  );
};
