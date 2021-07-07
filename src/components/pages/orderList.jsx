import { useState } from "react";
import FilterBox from "../common/filterBox";
import MyForm from "@/components/common/form";
export default () => {
  const [fields] = useState();
  const submit = (e) => {
    console.log(e);
  };
  return (
    <>
      <MyForm onSubmit={submit}>
        <input name="test" />
        <input name="bbb" />
      </MyForm>
      <FilterBox
        onSubmit={submit}
        fields={[
          {
            label: "订单号",
            name: "orderNum",
          },
          {
            label: "用户名",
            name: "username",
          },
          {
            label: "用户电话",
            name: "phoneNum",
          },
          {
            label: "创建人",
            name: "creator",
          },
          {
            label: "设备号",
            name: "machineNo",
          },
          {
            label: "快递单号",
            name: "expressNo",
          },
          {
            label: "生成日期",
            name: "createday",
            type: "date",
          },
          {
            label: "更新日期",
            name: "updateday",
            type: "date",
          },
          {
            label: "维修商",
            name: "repair",
          },
          {
            label: "维修商",
            name: "aaa",
          },
          {
            label: "支付状态",
            name: "pay",
            type: "select",
            options: {
              optionLabelProp: "label",
              options: [
                { label: "已支付", value: 1 },
                { label: "未支付", value: 0 },
              ],
            },
          },
        ]}
      ></FilterBox>
    </>
  );
};
