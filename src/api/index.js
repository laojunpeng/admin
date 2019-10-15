import instance from './instance';
import { convertRESTAPI } from './util';

/** 删除卡券 */
function card_remove_delete(opts) {
  return instance({
    method: 'delete',
    url: '/card/remove',
    opts: opts
  })
}

/** 卡券兑换操作 */
function card_detail_exchange_put(opts) {
  return instance({
    method: 'put',
    url: '/card/detail/exchange',
    opts: opts
  })
}

/** 卡券明细列表 */
function card_detail_sys_list_post(opts) {
  return instance({
    method: 'post',
    url: '/card/detail/sys/list',
    opts: opts
  })
}

/** 丰修 */
function order_fx_push_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/fx/push',
    opts: opts
  });
}

/** 闪修侠下单 */
function order_sxx_push_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/sxx/push',
    opts: opts
  });
}

/** 修改订单状态 */
function order_status_put(opts) {
  return instance({
    method: 'put',
    url:  '/order/status',
    opts: opts
  });
}

/** 快递查询 */
function order_express_get(opts) {
  return instance({
    method: 'get',
    url:  '/order/express',
    opts: opts
  });
}

/** 维修信息 */
function order_repair_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/repair',
    opts: opts
  });
}

/** 更新订单状态 */
function order_updateStatus_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/updateStatus',
    opts: opts
  });
}

/** 角色列表 */
function role_list_post(opts) {
  return instance({
    method: 'post',
    url:  '/role/list',
    opts: opts
  });
}

/** 用户详情接口 */
function user_detail_post(opts) {
  return instance({
    method: 'post',
    url:  '/user/detail',
    opts: opts
  });
}

/** 用户列表 */
function user_list_post(opts) {
  return instance({
    method: 'post',
    url:  '/user/list',
    opts: opts
  });
}

/** 用户编辑创建+修改密码 */
function user_edit_post(opts) {
  return instance({
    method: 'post',
    url:  '/user/edit',
    opts: opts
  });
}

/** 订单详情修改 */
function order_detail_edit_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/detail/edit',
    opts: opts
  });
}

/** 根据订单ID获取详情 */
function order_detail_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/detail',
    opts: opts
  });
}

/** 订单列表 */
function order_list_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/list',
    opts: opts
  });
}

/** 极客修下单 */
function order_jkx_push_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/jkx/push',
    opts: opts
  });
}

/** 创建订单 */
function order_edit_post(opts) {
  return instance({
    method: 'post',
    url:  '/order/edit',
    opts: opts
  });
}

/** 登出 */
function logout_post(opts) {
  return instance({
    method: 'post',
    url:  '/logout',
    opts: opts
  });
}

/** 登录 */
function login_post(opts) {
  return instance({
    method: 'post',
    url:  '/login',
    opts: opts
  });
}

export {
  card_remove_delete,
  card_detail_exchange_put,
  card_detail_sys_list_post,
  order_fx_push_post,
  order_sxx_push_post,
  order_status_put,
  order_express_get,
  order_repair_post,
  order_updateStatus_post,
  role_list_post,
  user_detail_post,
  user_list_post,
  user_edit_post,
  order_detail_edit_post,
  order_detail_post,
  order_list_post,
  order_jkx_push_post,
  order_edit_post,
  logout_post,
  login_post
};
