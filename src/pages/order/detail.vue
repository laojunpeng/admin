<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
      <card>
        <Spin fix v-if="contentLoading"></Spin>
        <Tabs type="card">
          <TabPane label="用户详情" icon="md-person">
            <customer ref="customer" :customerForm="customerForm" :rules="ruleValidate" :orderState="orderState"></customer>
          </TabPane>
          <TabPane label="机器详情" icon="logo-android" :disabled="orderState<=2">
            <template v-if="orderState>2">
              <robot v-for="(item,index) in customerForm.machines" :repairIndex="index" :repair="customerForm.repairs" :machine="customerForm.machines[index]" :key="index"></robot>
            </template>
          </TabPane>
          <TabPane label="快递详情" icon="md-mail" :disabled="orderState<=2">
            <expresss v-if="orderState>2" :orderId="$route.query.orderId"></expresss>
          </TabPane>
        </Tabs>
      </card>
      </Col>
      <Col :span="6" style="padding-left: 10px">
      <Card v-if="orderState<4&&orderState>0" style="margin-bottom: 10px">
        <p slot="title">
          <Icon type="folder"></Icon>
          操作
        </p>
        <Button type="primary" long @click="nextStatus">下一步</Button>
        <template v-if="orderState>1">
          <Button type="primary" long style="margin-top: 10px" @click="saveDetail">保存</Button>
        </template>
        <!--<Button long style="margin-top: 10px">重置</Button>-->
        <Button long style="margin-top: 10px" @click="cancel">取消</Button>
        <template v-if="orderState>1">
          <Button type="error" long style="margin-top: 50px" @click="nullify">作废</Button>
        </template>
      </Card>
      <Card>
        <my-steps :status="orderState"></my-steps>
      </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
import Customer from "./customer.vue";
import Robot from "./robot.vue";
import Expresss from "./express.vue";
import MySteps from "@/components/mySteps.vue";
import { mapState } from "vuex";
import {
  order_edit_post,
  order_jkx_push_post,
  order_detail_post,
  order_detail_edit_post,
  order_status_put,
  order_fx_push_post,
  order_sxx_push_post
} from "@/api/index";
export default {
  data() {
    return {
      orderState: 1,
      contentLoading: false,
      customerForm: {
        remark: "",
        supply: "极客修",
        sex: "",
        name: "",
        mobile: "",
        trackingNum: "",
        jkxRepairDate: "",
        status: "",
        address: ""
      },
      ruleValidate: {
        supply: [
          { required: true, message: "维修单位不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        mobile: [
          { required: true, message: "电话号码不能为空", trigger: "blur" }
        ],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    let self = this;
    let orderId = self.$route.query.orderId;
    if (orderId) {
      self.contentLoading = true;
      order_detail_post({ params: { orderId: orderId } }).then(e => {
        self.contentLoading = false;
        let result = e.data;
        if ((result.code = 200)) {
          let data = result.data;
          self.$set(self, "orderState", data.status);
          self.$set(self, "customerForm", data);
        }
      });
    }
  },
  methods: {
    nextStatus() {
      let self = this;
      switch (self.orderState) {
        case 1:
          self.$refs.customer.$refs.customerForm.validate(valid => {
            if (valid) {
              self.contentLoading = true;
              delete self.customerForm.createDate;
              order_edit_post({ params: self.customerForm }).then(e => {
                let data = e.data;
                if (data.code == 200) {
                  self.contentLoading = false;
                  self.notice("success", "success");
                  self.$router.replace({ path: "/order" });
                }
              });
            }
          });
          break;
        case 3:
          let orderId = self.$route.query.orderId;
          if (self.customerForm.supply == "极客修") {
            order_jkx_push_post({ params: { orderId: orderId } }).then(e => {
              if (e.data.code == 200) {
                self.contentLoading = false;
                self.notice("success", "success");
                self.$router.replace({ path: "/order" });
              }
            });
          } else if (self.customerForm.supply == "丰修") {
            order_fx_push_post({
              params: { orderId: orderId }
            }).then(e => {
              if (e.data.code == 200) {
                self.contentLoading = false;
                self.notice("success", "success");
                self.$router.replace({ path: "/order" });
              }
            });
          } else if (self.customerForm.supply == "闪修侠") {
            order_sxx_push_post({
              params: { orderId: orderId }
            }).then(e => {
              if (e.data.code == 200) {
                self.contentLoading = false;
                self.notice("success", "success");
                self.$router.replace({ path: "/order" });
              }
            });
          } else {
            order_status_put({
              params: {
                orderId: orderId,
                status: 4
              }
            }).then(e => {
              if (e.data.code == 200) {
                self.contentLoading = false;
                self.notice("success", "success");
                self.$router.replace({ path: "/order" });
              }
            });
          }
          //
          break;
      }
    },
    saveDetail() {
      let self = this;
      self.$refs.customer.$refs.customerForm.validate(valid => {
        delete self.customerForm.createDate;

        let postData = JSON.parse(JSON.stringify(self.customerForm));
        for (let i = 0; i < postData.machines.length; i++) {
          delete postData.machines[i].repairs;
        }

        if (valid) {
          self.contentLoading = true;
          console.info(self.customerForm);
          order_detail_edit_post({ params: postData }).then(e => {
            let data = e.data;
            if (data.code == 200) {
              self.contentLoading = false;
              self.notice("success", "success");
            }
          });
        }
      });
    },
    cancel() {
      history.go(-1);
    },
    nullify() {
      let self = this;
      let postData = {};
      postData.orderId = self.$route.query.orderId;
      postData.status = 0;
      this.$Modal.confirm({
        title: "作废",
        content: "<p>确认改变订单状态为失效吗？</p>",
        onOk: () => {
          order_edit_post({ params: postData }).then(e => {
            let data = e.data;
            if (data.code == 200) {
              self.notice("success", "success");
              self.$router.replace({ path: "/order" });
            }
          });
        },
        onCancel: () => {}
      });
    }
  },
  components: {
    Customer,
    Robot,
    MySteps,
    Expresss
  },
  computed: {
    ...mapState(["user"])
  }
};
</script>
<style scoped>
.step {
  padding: 20px;
}
</style>
