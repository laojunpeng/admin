import { ProFormText, ProFormRadio } from "@ant-design/pro-form";
import { Form, Input, Divider } from "antd";
import { SEX_ENUM, ORDER_USER_ENUM } from "@/assets/enum/order";
const { Item } = Form;

export default ({ id }) => {
  return (
    <>
      <Divider id={id} orientation="right">
        用户详情
      </Divider>
      {/* 用户姓名 */}
      <ProFormText
        name={ORDER_USER_ENUM.name}
        label="用户姓名"
        width="sm"
        rules={[{ required: true }]}
      />
      {/* 性别 */}
      <ProFormRadio.Group
        name={ORDER_USER_ENUM.sex}
        label="性别"
        valueEnum={SEX_ENUM}
        radioType="button"
        rules={[{ required: true }]}
      />
      {/* 电话号码 */}
      <ProFormText
        name={ORDER_USER_ENUM.mobile}
        label="电话号码"
        width="sm"
        rules={[{ required: true }]}
      />
      {/* 省份 */}
      <ProFormText name={ORDER_USER_ENUM.province} label="省份" width="sm" />
      {/* 城市 */}
      <ProFormText name={ORDER_USER_ENUM.city} label="城市" width="sm" />
      {/* 地区 */}
      <ProFormText name={ORDER_USER_ENUM.area} label="地区" width="sm" />
      {/* 地址 */}
      <ProFormText
        rules={[{ required: true }]}
        name={ORDER_USER_ENUM.address}
        label="地址"
        width="md"
      />
      {/* 快递单号 */}
      <ProFormText
        name={ORDER_USER_ENUM.trackingNum}
        label="快递单号"
        width="md"
      />
    </>
  );
};
