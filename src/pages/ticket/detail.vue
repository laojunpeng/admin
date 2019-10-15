<template>
  <div class="common-layout-container">
    <Card>
      <Form class='form' :model="formData" ref="form" :label-width="120">
        <Row>
          <Col span="12">
            <FormItem label="卡券名称：" prop="name">
              <span>{{formData.name}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="售价：" prop="price">
              <span>{{formData.price}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="有效期：" prop="vaildDate">
              <span>{{formData.vaildDate}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="总销售量：" prop="sale_count">
              <span>{{formData.sale_count}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="未使用：" prop="not_used_count">
              <span>{{formData.not_used_count}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="已使用：" prop="used_count">
              <span>{{formData.used_count}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="已过期：" prop="expired_count">
              <span>{{formData.expired_count}}</span>
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
            <Select placeholder="排序" class="table-select" v-model="filterForm.order" style="width:150px">
              <Option v-for="item in ticketOrder" :value="item.key" :key="item.key">{{ item.value }}</Option>
            </Select>
          </div>
        </div>
        <div class="table-content">
          <!-- 兑换操作账号无对应key -->
          <!-- .卡券明细中的数据列表仅显示此卡券的已购买卡券明细 -->
          <Table :loading="isLoading" border :columns="tableColumn" :data="list.content">
            <!-- 只有处于未使用状态的卡券显示兑换使用操作功能按钮，其余状态不显示 -->
            <template slot-scope="{row}" slot="operation">
              <div class="slot-operate">
                <a v-if="row.status==0" @click="exchange(row.id)">兑换使用</a>
                <a v-else>-</a>
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
import ticketOrder from '@/assets/json/ticketOrder.json'
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
            "status": 0
          }
        ],
        total: 0
      },
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
      filterForm: {},
      useStatus: ticketUseStatus,
      ticketOrder
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
    exchange(id) {
      this.$Modal.confirm({
        title: "兑换卡券提示",
        content: "<p>是否确认兑换该卡券？</p>",
        onOk: () => {
          console.log(11111111)
        },
      });
    }
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
