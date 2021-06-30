import { Tabs } from "antd";
import { usePanes } from "../store/panes.js";
import style from "../assets/css/layout/tabs.css";

const { TabPane } = Tabs;
const TabsLayout = () => {
  const { panes, removePane, activeKey, setActiveKey } = usePanes();
  const edit = (targetKey, action) => {
    if (action === "remove") {
      removePane(targetKey);
    }
  };
  const change = (activeKey) => {
    setActiveKey(activeKey);
  };
  return (
    <Tabs
      className={style.container}
      activeKey={activeKey}
      size="middle"
      type="editable-card"
      hideAdd={true}
      onEdit={edit}
      onChange={change}
      tabBarStyle={{ margin: 0, padding: "0 10px" }}
    >
      {panes.map((pane) => (
        <TabPane
          className={style.pane}
          forceRender={true}
          tab={pane.title}
          key={pane.key}
        >
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default TabsLayout;
