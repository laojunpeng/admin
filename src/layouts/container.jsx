import { Layout, Menu } from "antd";
import { Suspense } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "@/components/pages/index";
import style from "../assets/css/layout/container.css";
const { Content, Footer, Sider } = Layout;
import menuJson from "@/assets/menu";
import pages from "@/components/pages";
import { usePanes } from "../store/panes.js";
export default ({ children }) => {
  const { addPane, activeKey } = usePanes();
  console.log(activeKey);
  const menuClick = ({ componentName, name }) => {
    const Component = pages[componentName];
    addPane({
      title: name,
      content: (
        <Suspense fallback={"loading"}>
          <Component></Component>
        </Suspense>
      ),
      key: componentName,
    });
  };
  return (
    <Layout className={style.container}>
      <Sider className={style.sider}>
        <div className={style.logo}>智伴科技</div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["4"]}
          style={{ border: "none" }}
          selectable={false}
        >
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
                          console.log(sub);
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
        <Content className={style.content}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
