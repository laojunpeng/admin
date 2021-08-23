import { Layout, Menu } from "antd";
import { Suspense } from "react";
import { MailOutlined } from "@ant-design/icons";
import "@/components/pages/index";
import style from "../assets/css/layout/container.css";
const { Content, Sider, Header } = Layout;
import menuJson from "@/assets/menu";
import pages from "@/components/pages";
import Loading from "@/components/loading.jsx";
import MyHeader from "@/components/layout/header.jsx";

import { usePanes } from "../store/panes.js";
export default ({ children }) => {
  const { addPane } = usePanes();
  const menuClick = ({ componentName, name }) => {
    const Component = pages[componentName];
    addPane({
      title: name,
      content: (
        <Suspense fallback={<Loading></Loading>}>
          <Component></Component>
        </Suspense>
      ),
      key: componentName,
    });
  };
  return (
    <Layout className={style.container}>
      <Sider className={style.sider}>
        <div className={style.logo}>售后系统</div>
        <Menu mode="inline" style={{ border: "none" }} selectable={false}>
          {menuJson.map((item) => {
            return (
              <Menu.ItemGroup
                key={item.key}
                icon={<MailOutlined />}
                title={item.name}
              >
                {item.children &&
                  item.children.map((sub) => {
                    return (
                      <Menu.Item
                        onClick={() => {
                          menuClick(sub);
                        }}
                        key={sub.key}
                      >
                        {sub.name}
                      </Menu.Item>
                    );
                  })}
              </Menu.ItemGroup>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header className={style.header}>
          <MyHeader></MyHeader>
        </Header>
        <Content className={style.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};
