<template>
  <div class="common-layout-container">
    <Card>
      <Form class='form' :model="formData" ref="form" :label-width="120">
        <Row>
          <Col span="12">
             <FormItem label="卡券名称：" prop="name">
              <Input type="text" readonly v-model.trim="formData.name" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="售价：" prop="price">
              <Input type="text" readonly v-model.trim="formData.price" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="有效期：" prop="vaildDate">
              <Input type="text" readonly v-model.trim="formData.vaildDate" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="总销售量：" prop="sale_count">
              <Input type="text" readonly v-model.trim="formData.sale_count" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="未使用：" prop="not_used_count">
              <Input type="text" readonly v-model.trim="formData.not_used_count" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="已使用：" prop="used_count">
              <Input type="text" readonly v-model.trim="formData.used_count" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
             <FormItem label="已过期：" prop="expired_count">
              <Input type="text" readonly v-model.trim="formData.expired_count" style="width:300px" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
    <Card class="table-card">
      <Form ref="filterForm" :model="filterForm" inline :label-width="80">
        <FormItem prop="status" label="使用状态：">
          <Select placeholder="请选择" class="table-select" v-model="filterForm.status" style="width:150px;">
            <Option v-for="item in useStatus" :value="item.key" :key="item.key">{{ item.value }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="orderNum" label="订单编号：">
          <Input type="text" v-model="filterForm.orderNum" placeholder="请输入订单编号">
          </Input>
        </FormItem>
        <FormItem prop="orderNum" label="卡券码：">
          <Input type="text" v-model="filterForm.orderNum" placeholder="请输入卡券码">
          </Input>
        </FormItem>
        <Button type="primary" @click="e => {this.pageData.pageNo==1?loadData():this.pageData.pageNo=1 }" style="margin: 0 20px;">查询</Button>
        <Button @click="clearFilter">重置</Button>
      </Form>
      <div class="table">
        <div class="table-head">
          <div class="table-title">
            <Icon type="ios-list-box" size="16" style="vertical-align: text-bottom"/>
            数据列表
          </div>
          <div class="table-btn">
            <Select placeholder="显示条数" class="table-select" v-model="pageData.pageSize" @on-change="e => {this.pageData.pageNo==1?loadData():this.pageData.pageNo=1 }" style="width:100px; margin-right: 10px">
              <Option v-for="item in pageSizeList" :value="item" :key="item.index">{{ item }}</Option>
            </Select>
          </div>
        </div>
        <div class="table-content">
          <!-- 兑换操作账号无对应key -->
          <Table :loading="isLoading" border :columns="tableColumn" :data="list.content">
            <template slot-scope="{row}" slot="operation">
              <div class="slot-operate">
                <a>兑换使用</a>
              </div>
            </template>
          </Table>
          <div class="footer">
            <div style="float: right;">
              <Page :current="pageData.pageNo" :page-size="pageData.pageSize" :total="list.total" show-elevator show-total @on-change="e => {this.pageData.pageNo = e}"></Page>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import tableColumn from '@/assets/js/tableColumns/ticketCode.js';
import ticketUseStatus from '@/assets/json/ticketUseStatus.json';
export default {
  data () {
    return {
      formData: {},
      pageSizeList: [10, 20, 30, 40, 50],
      tableColumn,
      isLoading: false,
      list: {
        content: [
          {
            "code": "1570782284306",
            "disableDate": 1572189269000,
            "openId": "o3DoL0WEdzcJ20AVJg1crP96gbjj",
            "name": "测试售后券2",
            "orderNum": "201910120136",
            "payDate": 1570815404000,
            "status": 1
          }
        ],
        total: 0
      },
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
      filterForm: {},
      useStatus: ticketUseStatus
    }
  },
  created () {

  },
  watch: {
    pageData: {
      immediate: true,
      handler: function(val) {
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      // this.isLoading = true;
      // this.$api
      //   .payment_v1_ticket_list_get({
      //     params: {
      //       ...this.filterForm,
      //       ...this.pageData}
      //   })
      //   .then(e => {
      //     if (e.code == 200) {
      //       this.list.content = e.data.content;
      //       this.list.total = e.data.total;
      //     }
      //     this.isLoading = false;
      //   });
    },
    clearFilter() {
      this.$refs.filterForm.resetFields();
      this.pageData.pageNo == 1
        ? this.loadData()
        : (this.pageData.pageNo = 1);
    },
  }
}
</script>

<style scoped>
@import url('../../assets/css/table.css');
.common-layout-container{
  padding: 10px;
}
.table-card{
  margin-top: 10px;
}
</style>
