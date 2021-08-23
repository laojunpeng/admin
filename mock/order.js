import mockjs from "mockjs";
export default {
  "GET /api/order": mockjs.mock({
    "data|20": [
      {
        machineNo: "@id",
        "id|+1": 0,
        username: "@name",
        phoneNum: /^1[3456789]\d{9}/,
        "repair|1": ["智伴", "丰修", "富士康"],
      },
    ],
  }),
};
