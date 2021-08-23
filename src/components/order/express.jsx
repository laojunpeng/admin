import { ProFormText } from "@ant-design/pro-form";
import { Divider } from "antd";
import { ORDER_EXPRESS_ENUM } from "@/assets/enum/order";

export default ({ id }) => {
  return (
    <>
      <Divider id={id} orientation="right">
        回寄情况
      </Divider>
      {/* 新sn */}
      <ProFormText
        name={ORDER_EXPRESS_ENUM.newSn}
        label="新sn"
        width="sm"
        rules={[{ required: true }]}
      />
      {/* 新设备号 */}
      <ProFormText
        name={ORDER_EXPRESS_ENUM.newDeviceNum}
        label="新设备号"
        width="sm"
      />
      {/* 新IMEI */}
      <ProFormText
        name={ORDER_EXPRESS_ENUM.newImei}
        label="新IMEI"
        width="sm"
      />
      {/* 快递单号 */}
      <ProFormText
        name={ORDER_EXPRESS_ENUM.express}
        label="快递单号"
        width="sm"
        rules={[{ required: true }]}
      />
    </>
  );
};
