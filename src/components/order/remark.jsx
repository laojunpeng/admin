import { ProFormTextArea } from "@ant-design/pro-form";
import { Divider } from "antd";
import { ORDER_CHECK_ENUM } from "@/assets/enum/order";

export default ({ id }) => {
  return (
    <>
      <Divider id={id} orientation="right">
        备注
      </Divider>
      {/* 维修备注 */}
      <ProFormTextArea
        name={ORDER_CHECK_ENUM.remark}
        label="维修备注"
        width="lg"
      />
    </>
  );
};
