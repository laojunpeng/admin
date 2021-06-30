const files = require.context("./", true, /\.jsx$/);
const pages = {};
files.keys().forEach((element) => {
  const name = element.replace("./", "").replace(".jsx", "");
  pages[name] = files(element).default;
});
export default pages;
