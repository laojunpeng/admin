const menu = [
  {
    name: "权限管理",
    key: "g1",
    children: [
      {
        name: "账号管理",
        componentName: "account",
        key: "account",
      },
      {
        name: "角色管理",
        componentName: "role",
        key: "role",
      },
    ],
  },
  {
    name: "维修单管理",
    key: "g2",
    children: [
      {
        name: "维修单",
        componentName: "order",
        key: "order",
      },
    ],
  },
];
export default menu;
