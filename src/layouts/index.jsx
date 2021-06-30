import { RecoilRoot } from "recoil";
import TabsLayout from "./tabs.jsx";
import ContainerLayout from "./container.jsx";

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
