import instance from "./instance";
import { convertRESTAPI } from "./util";

/** 冻结 */
function api_role_get(opts) {
  return instance({
    method: "get",
    url: "/api/role",
    opts: opts,
  });
}

/** 订单列表 */
function api_order_get(opts) {
  return instance({
    method: "get",
    url: "/api/order",
    opts: opts,
  });
}

export { api_role_get, api_order_get };
