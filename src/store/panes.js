import { atom, useRecoilState } from "recoil";
import { findIndex, filter } from "lodash";
import OrderList from "@/components/pages/order.jsx";
export const panesState = atom({
  key: "panes",
  default: [
    {
      key: "order",
      content: <OrderList></OrderList>,
      title: "维修单",
    },
  ],
});

export const activeKeyState = atom({
  key: "activeKey",
  default: "order",
});

export function usePanes() {
  const [panes, setPanes] = useRecoilState(panesState);
  const [activeKey, setActiveKey] = useRecoilState(activeKeyState);
  const addPane = ({ title, content }) => {
    if (!title || !content) {
      console.error("新增panes，title、content、key不能为空");
      return;
    }
    const key = String(new Date().getTime());
    // const index = findIndex(panes, { key });
    // if (index === -1) {
    setPanes(panes.concat({ title, content, key }));
    // }
    setActiveKey(key);
  };

  const removePane = (key) => {
    if (!key) {
      console.error("删除panes，key不能为空");
      return;
    }
    const index = findIndex(panes, { key });
    if (index !== -1) {
      const newPanes = filter(panes, (n) => {
        return n.key !== key;
      });
      setPanes(newPanes);
      if (activeKey === key) {
        setActiveKey(newPanes[0]?.key);
      }
    }
  };

  return { panes, addPane, removePane, activeKey, setActiveKey };
}
