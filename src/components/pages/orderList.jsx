import React, { useRef } from "react";
import { PlusOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Tag, Space, Menu, Dropdown } from "antd";
import ProTable, { TableDropdown } from "@ant-design/pro-table";
import request from "umi-request";
import { api_order_get } from "@/api";

const columns = [
  {
    title: "订单号",
    width: 100,
    dataIndex: "id",
    key: "id",
    fixed: "left",
  },
  {
    title: "维修编号",
    width: 100,
    dataIndex: "machineNo",
    key: "machineNo",
  },
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    width: 150,
  },
  {
    title: "手机号",
    dataIndex: "phoneNum",
    key: "phoneNum",
    width: 150,
  },
  {
    title: "维修商",
    dataIndex: "repair",
    key: "repair",
    width: 150,
  },
  {
    title: "生成时间",
    dataIndex: "generateDate",
    key: "generateDate",
    valueType: "date",
    width: 150,
  },
  {
    title: "更新时间",
    dataIndex: "updateDate",
    key: "updateDate",
    valueType: "date",
    width: 150,
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    valueType: "select",
    valueEnum: { 0: "未支付", 1: "已支付" },
    width: 150,
  },
  {
    title: "创建人",
    dataIndex: "creator",
    key: "creator",
    width: 150,
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <Space>
        <Button type="link" size={"small"}>
          二维码
        </Button>
        <Button type="link" size={"small"}>
          管理
        </Button>
      </Space>
    ),
  },
];

export default () => {
  const actionRef = useRef();
  return (
    <ProTable
      columnsStateMap={{ key: { fixed: true } }}
      columns={columns}
      actionRef={actionRef}
      request={async (params = {}, sort, filter) => {
        const relust = await api_order_get();
        return {
          data: relust.data.data,
          success: true,
        };
      }}
      rowKey="id"
      scroll={{ x: 1400 }}
      search={{
        labelWidth: "auto",
      }}
      // form={{
      //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
      //   syncToUrl: (values, type) => {
      //     if (type === 'get') {
      //       return {
      //         ...values,
      //         created_at: [values.startTime, values.endTime],
      //       };
      //     }
      //     return values;
      //   },
      // }}
      // pagination={{
      //   pageSize: 5,
      // }}
      options={false}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
      ]}
    />
  );
};
