import { useEffect } from "react";
import { Tree } from "antd";
import { api_role_get } from "@/api";
const treeData = [];

export default () => {
  useEffect(() => {
    api_role_get().then((e) => {
      console.log(e);
    });
  });
  return <>角色管理</>;
};
