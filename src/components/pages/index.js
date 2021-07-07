import { lazy } from "react";
const files = require.context("./", true, /\.jsx$/, "lazy");
const pages = {};
files.keys().forEach((element) => {
  const name = element.replace("./", "").replace(".jsx", "");
  pages[name] = lazy(() => import(`@/components/pages/${name}.jsx`));
});
export default pages;
