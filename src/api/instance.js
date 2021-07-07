import { createAPI } from "./util";
import config from "./config";

const baseUrl = {
  mock: "https://easy-mock.bookset.io/mock/605c36f8d17dde4a21ab6037/mobile-operator",
  dev: "",
  pre: "http://112.74.50.185:8201",
  prod: "/operator",
}[config.env || "mock"];

export default createAPI(baseUrl);
