<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="20">
      <Card>
        <Form ref="formInline" :model="formInline" inline>
          <FormItem prop="name">
            <Input type="text" v-model="formInline.name" placeholder="用户名">
            <Icon type="ios-person" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="mobile">
            <Input type="text" v-model="formInline.mobile" placeholder="用户电话">
            <Icon type="iphone" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="creater">
            <Input type="text" v-model="formInline.creater" placeholder="创建人">
            <Icon type="happy-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <!-- <FormItem prop="status">
            <Input type="text" v-model="formInline.status" placeholder="状态">
            <Icon type="social-android" slot="prepend"></Icon>
            </Input>
          </FormItem> -->
          <FormItem prop="deviceSn">
            <Input type="text" v-model="formInline.deviceSn" placeholder="设备号">
            <Icon type="social-android" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="trackingNum">
            <Input type="text" v-model="formInline.trackingNum" placeholder="快递单号">
            <Icon type="plane" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <DatePicker type="daterange" placeholder="选择生成日期" v-model="date" confirm style="width: 200px">
              <Icon type="plane" slot="prepend"></Icon>
            </DatePicker>
          </FormItem>
          <FormItem>
            <DatePicker type="daterange" placeholder="选择更新日期" v-model="updateDate" confirm style="width: 200px">
              <Icon type="plane" slot="prepend"></Icon>
            </DatePicker>
          </FormItem>
          <FormItem prop="supply">
            <Input type="text" v-model="formInline.supply" placeholder="维修商">
            <Icon type="social-android" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchData(true)">查询</Button>
          </FormItem>
          <FormItem>
            <Button @click="searchData(false)">重置</Button>
          </FormItem>
        </Form>
        <Table :loading="tableLoading" border stripe :columns="columns" highlight-row :data="data"></Table>
      </Card>
      </Col>
      <Col :span="4" style="padding-left: 10px">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          操作
        </p>
        <Button type="info" @click="addOrder" long>新增</Button>
      </Card>
      <Card style="margin-top: 10px">
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          分页
        </p>
        <Page :current="orderPageNum" :page-size="pageData.pageSize" :total="pageData.total" simple @on-change="changePage"></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import QRCode from "qrcode";
import { order_list_post } from "../../api/index";
import statusData from "../../../static/data/status.json";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      qrcode: "",
      formInline: {
        name: "",
        mobile: "",
        trackingNum: "",
        creater: "",
        deviceSn: "",
        supply:""
      },
      updateDate: [],
      date: [],
      tableLoading: false,
      columns: [
        {
          title: "订单号",
          align: "center",
          width: 75,
          key: "orderId"
        },
        {
          title: "用户名",
          align: "center",
          key: "name",
          width: 75,
          render: (h, params) => {
            return h("div", params.row.name ? params.row.name : "-");
          }
        },
        {
          title: "用户手机号",
          align: "center",
          key: "mobile",
          width: 115,
          render: (h, params) => {
            return h("div", params.row.mobile ? params.row.mobile : "-");
          }
        },
        {
          title: "维修商",
          align: "center",
          key: "supply",
        },
        //          {
        //            title: '快递单号',
        //            align: 'center',
        //            width: 150,
        //            key: 'trackingNum',
        //            render: (h, params) => {
        //              return params.row.trackingNum ? params.row.trackingNum : "-"
        //            }
        //          },
        {
          title: "生成时间",
          align: "center",
          key: "createDate",
          render: (h, params) => {
            return h("div", this.dateFilter(params.row.createDate));
          }
        },
        {
          title: "更新时间",
          align: "center",
          key: "updateDate",
          render: (h, params) => {
            return h(
              "div",
              params.row.updateDate
                ? this.dateFilter(params.row.updateDate)
                : "-"
            );
          }
        },
        {
          title: "状态",
          align: "center",
          key: "status",
          width: 115,
          render: (h, params) => {
            return h(
              "div",
              params.row.status == 0
                ? "订单失效"
                : statusData[params.row.status - 1].name
            );
          }
        },
        {
          title: "创建人",
          align: "center",
          key: "creater",
          width: 90
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Poptip",
                {
                  props: {
                    placement: "left"
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "text",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          this.initQrcode(params);
                        }
                      }
                    },
                    "二维码"
                  ),
                  h(
                    "div",
                    {
                      slot: "content"
                    },
                    [
                      h(
                        "a",
                        {
                          attrs: {
                            //正式
                            href:
                              "http://csc.zhibankeji.com/index-wap#/detail?" +
                              "orderId=" +
                              params.row.orderId +
                              "&accessToken=QEdaemliIQ==",
                            //测试
                            //                          href: 'http://test.zhibankeji.com/index-wap#/index?' + 'orderId=' + params.row.orderId + '&accessToken=QEdaemliIQ==',
                            target: "_blank"
                          }
                        },
                        [
                          h("img", {
                            attrs: {
                              src: this.qrcode
                            }
                          })
                        ]
                      )
                    ]
                  )
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.edit(params);
                    }
                  }
                },
                "管理"
              )
            ]);
          }
        }
      ],
      data: [],
      pageData: {
        pageSize: 10,
        total: 0
      }
    };
  },
  created() {
    let self = this;
    self.formInline = self.orderParams;
    self.initData();
  },
  methods: {
    checkDate(date) {
      return date && date.length != 0 && date[0] && date[1];
    },
    initData() {
      let self = this;
      self.tableLoading = true;
      let date = {};
      let updateDate = {};
      if (self.checkDate(self.date)) {
        date.beginDate = new Date(self.date[0]).toLocaleString();
        date.endDate = new Date(self.date[1]).toLocaleString();
      }
      if (self.checkDate(self.updateDate)) {
        updateDate.beginUpdate = new Date(self.updateDate[0]).toLocaleString();
        updateDate.endUpdate = new Date(self.updateDate[1]).toLocaleString();
      }
      let postData = Object.assign(
        {},
        self.formInline,
        { pageNum: self.orderPageNum },
        date,
        updateDate,
        self.pageData
      );
      order_list_post({ params: postData }).then(e => {
        self.tableLoading = false;
        let result = e.data;
        if (result.code == 200) {
          self.$set(self, "data", result.data.records);
          self.$set(self.pageData, "total", result.data.total);
        }
      });
    },
    edit(params) {
      let self = this;
      let orderId = params.row ? params.row.orderId : 0;
      self.$router.push({ path: `/order/detail`, query: { orderId } });
    },
    addOrder() {
      let self = this;
      self.$router.push({ path: `/order/detail` });
    },
    searchData(flag) {
      let self = this;
      self.$store.commit("setOrderPageNum", 1);
      if (flag) {
        self.initData();
      } else {
        self.$store.commit("setOrderPageNum", 1);
        self.$store.commit("setOrderParams", {});
        self.date = [];
        self.updateDate = [];
        self.$refs["formInline"].resetFields();
        self.initData();
      }
    },
    initQrcode(params) {
      let self = this;
      //正式
      let url =
        "http://csc.zhibankeji.com/index-wap#/detail?" +
        "orderId=" +
        params.row.orderId +
        "&accessToken=QEdaemliIQ==";
      //测试
      //        let url = 'http://test.zhibankeji.com/index-wap#/index?' + 'orderId=' + params.row.orderId + '&accessToken=QEdaemliIQ==';

      self.qrcode = "";
      QRCode.toDataURL(url, function(err, url) {
        self.qrcode = url;
      });
    },
    changePage(index) {
      let self = this;
      // self.$set(self.pageData, "pageNum", index);
      self.$store.commit("setOrderPageNum", index);
      self.initData();
    }
  },
  watch: {
    formInline: {
      handler: function(val, oldVal) {
        this.$store.commit("setOrderParams", val);
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      orderPageNum: "orderPageNum",
      orderParams: "orderParams"
    })
  }
};
</script>

