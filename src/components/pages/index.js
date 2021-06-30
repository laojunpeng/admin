import React from "react";
const files = require.context("./", true, /\.jsx$/);
const pages = {};
files.keys().forEach((element) => {
  const name = element.replace("./", "").replace(".jsx", "");
  pages[name] = React.lazy(() => import(files.resolve(element)));
});
export default pages;
