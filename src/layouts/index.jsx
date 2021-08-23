import { RecoilRoot } from "recoil";
import TabsLayout from "./tabs.jsx";
import ContainerLayout from "./container.jsx";
import { Prompt } from "umi";
export default function Layout({ children, location }) {
  if (location.pathname === "/login") {
    return <>{children}</>;
  }

  return (
    <RecoilRoot>
      <ContainerLayout>
        <TabsLayout>{children}</TabsLayout>
      </ContainerLayout>
    </RecoilRoot>
  );
}
