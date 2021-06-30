import { atom, useRecoilState, selector } from "recoil";
import { findIndex, filter, last } from "lodash";
export const panesState = atom({
  key: "panes",
  default: [{ title: "首页", content: <>首页</>, key: "index" }],
});

export const activeKeyState = atom({
  key: "activeKey",
  default: "index",
});

export function usePanes() {
  const [panes, setPanes] = useRecoilState(panesState);
  const [activeKey, setActiveKey] = useRecoilState(activeKeyState);

  const addPane = ({ title, content, key }) => {
    console.log(title, content, key);
    if (!title || !content || !key) {
      console.error("新增panes，title、content、key不能为空");
      return;
    }
    const index = findIndex(panes, { key });
    if (index === -1) {
      setPanes(panes.concat({ title, content, key }));
    }
    setActiveKey(key);
  };

  const removePane = (key) => {
    if (!key) {
      console.error("删除panes，key不能为空");
      return;
    }
    const index = findIndex(panes, { key });
    if (index !== -1) {
      setPanes(
        filter(panes, (n) => {
          return n.key !== key;
        })
      );
      if (activeKey === key && panes.length > 1) {
        setActiveKey(panes[0].key);
      }
    }
  };

  return { panes, addPane, removePane, activeKey, setActiveKey };
}
