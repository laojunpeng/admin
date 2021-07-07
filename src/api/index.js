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

export { api_role_get };
