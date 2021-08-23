const ORDER_USER_ENUM = {
  //订单号
  id: "id",
  //用户名
  name: "name",
  //性别
  sex: "sex",
  //用户电话
  mobile: "mobile",
  //维修商
  supply: "supply",
  //创建人
  creater: "creater",
  //状态
  status: "status",
  //设备号
  deviceSn: "deviceSn",
  //快递单号
  trackingNum: "trackingNum",
  //生成日期
  date: "date",
  //更新日期
  updateDate: "updateDate",
  //订单录入
  input: "input",
  //客服备注
  remark: "remark",
  //省份
  province: "province",
  //城市
  city: "city",
  //地区
  area: "area",
  //地址
  address: "address",
};

const ORDER_MACHINE_ENUM = {
  //机器人类型
  type: "type",
  //数量
  count: "count",
  //设备号
  deviceSn: "deviceSn",
  //问题描述
  description: "description",
  //描述图片
  picUrl: "picUrl",
};

const ORDER_RECEIVE_ENUM = {
  //颜色
  color: "color",
  //缺少配件
  parts: "parts",
  //裸机
  bare: "bare",
  //维修编号
  repairId: "repairId",
  //原sn
  sn: "sn",
  //原设备号
  deviceSn: "deviceSn",
  //IMEI
  imei: "imei",
  //激活时间
  activeDate: "activeDate",
  //保修情况
  warranty: "warranty",
  //检测人
  inspector: "inspector",
};

const ORDER_CHECK_ENUM = {
  //检测人
  inspector: "inspector",
  //外观检测
  appearance: "appearance",
  //实际不良描述
  badMachineDesc: "badMachineDesc",
  //不良类型
  badMachineType: "badMachineType",
  //待换物料
  material: "material",
  //检测时间
  checkDate: "checkDate",
  //维修费用
  cost: "cost",
  //备注
  remark: "remark",
};

const ORDER_REPAIR_ENUM = {
  //检测人
  inspector: "inspector",
  //实际更换零件
  realityParts: "realityParts",
  //免费更换零件
  freeParts: "freeParts",
};

const ORDER_VERIFY_ENUM = {
  //支付日期
  payDate: "payDate",
  //实际支付金额
  payCost: "payCost",
  //特殊处理结果
  special: "special",
};

const ORDER_EXPRESS_ENUM = {
  //新sn
  newSn: "newSn",
  //新设备号
  newDeviceNum: "newDeviceNum",
  //新IMEI
  newImei: "newImei",
  //快递单号
  express: "express",
};

const ORDER_SPECIAL_ENUM = {
  0: "无",
  1: "以旧换新",
  2: "打款维修",
  3: "原返",
};

const MACHINE_BAD_DESC_ENUM = {
  0: "无异常",
  1: "无法开机",
  2: "无反应",
  3: "接触不良",
  4: "唛线坏",
  5: "喇叭线坏",
  6: "喇叭坏",
  7: "屏幕裂",
  8: "花屏",
  9: "屏幕不良",
};
const MACHINE_BAD_TYPE_ENUM = {
  0: "无",
  1: "物料不良",
  2: "人为不良",
  3: "制程不良",
  4: "过保",
  5: "人为过保",
  6: "免费维修",
};

const MACHINE_APPEARANCE_ENUM = {
  0: "刮花",
  1: "脏污",
};

const MACHINE_INSPECTOR_ENUM = {
  0: "史文龙",
  1: "林",
  3: "廖",
  4: "赖",
};
const MACHINE_WARRANTY_ENUM = {
  0: "保内",
  1: "保外",
  2: "人为",
  3: "换新",
};
const MACHINE_BARE_ENUM = {
  0: "否",
  1: "是",
};
const PACK_PARTS_ENUM = {
  0: "充电线",
  1: "说明书",
};
const MACHINE_COLOR_ENUM = {
  0: "白色",
  1: "蓝色",
};
const SUPPLY_ENUM = {
  0: "智伴",
  1: "丰修",
};

const SEX_ENUM = {
  0: "女士",
  1: "先生",
};

const INPUT_ENUM = {
  0: "客户录入",
  1: "后台补录",
  2: "后台拆单录入",
  3: "后台合并录入",
};

const MACHINE_ENUM = {
  1: "1S机器人",
  2: "1S机器人",
  5: "1X机器人",
  6: "小K机器",
  3: "小Z机器人",
  0: "App版机器人",
  4: "定制版机器",
  7: "逻辑思维训练机1C",
  8: "智能护眼仪",
  9: "小Y机器人",
  10: "小H绘本机器人",
  11: "逻辑思维训练机1Cpro",
  12: "智伴小I指读学习机",
  13: "智伴智能教育台灯",
};

const MACHINE_PARTS_ENUM = {
  0: "无",
  1: "主板",
  2: "开关板",
  3: "喇叭",
};

export {
  ORDER_USER_ENUM,
  ORDER_MACHINE_ENUM,
  ORDER_RECEIVE_ENUM,
  ORDER_CHECK_ENUM,
  ORDER_VERIFY_ENUM,
  ORDER_SPECIAL_ENUM,
  ORDER_REPAIR_ENUM,
  ORDER_EXPRESS_ENUM,
  SUPPLY_ENUM,
  INPUT_ENUM,
  SEX_ENUM,
  MACHINE_ENUM,
  MACHINE_COLOR_ENUM,
  PACK_PARTS_ENUM,
  MACHINE_BARE_ENUM,
  MACHINE_WARRANTY_ENUM,
  MACHINE_INSPECTOR_ENUM,
  MACHINE_APPEARANCE_ENUM,
  MACHINE_BAD_DESC_ENUM,
  MACHINE_BAD_TYPE_ENUM,
  MACHINE_PARTS_ENUM,
};
