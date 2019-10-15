<template>
  <div class="common-layout-container">
    <Card>
      <Form ref="filterForm" :model="filterForm" inline :label-width="80">
        <FormItem prop="name" label="卡券名称：">
          <Input type="text" v-model="filterForm.name" placeholder="请输入卡券名称">
          </Input>
        </FormItem>
        <Button type="primary" @click="e => {this.pageData.pageNo==1?loadData():this.pageData.pageNo=1 }" style="margin: 0 20px;">查询</Button>
        <Button @click="clearFilter">重置</Button>
      </Form>
    </Card>
    <Card class="table-card">
      <div class="table">
        <div class="table-head">
          <div class="table-title">
            <Icon type="ios-list-box" size="16" style="vertical-align: text-bottom"/>
            数据列表
          </div>
          <div class="table-btn">
            <Button to="/ticket/edit">添加卡券</Button>
            <Select placeholder="显示条数" class="table-select" v-model="pageData.pageSize" @on-change="e => {this.pageData.pageNo==1?loadData():this.pageData.pageNo=1 }" style="width:100px; margin-right: 10px">
              <Option v-for="item in pageSizeList" :value="item" :key="item.index">{{ item }}</Option>
            </Select>
          </div>
        </div>
        <div class="table-content">
          <Table :loading="isLoading" border :columns="tableColumn" :data="list.content">
            <template slot-scope="{row}" slot="operation">
              <div class="slot-operate">
                <router-link style="color:#2d8cf0" :to="{path:'/ticket/detail',query:{id: row.id}}">查看</router-link>
                <router-link style="color:#2d8cf0" :to="{path:'/ticket/edit',query:{id: row.id}}">编辑</router-link>
                <a @click="deleteTicket(row.id)" style="color:red">删除</a>
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
import tableColumn from '@/assets/js/tableColumns/ticket.js';

export default {
  data () {
    return {
      filterForm: {},
      pageData: {
        pageNo: 1,
        pageSize: 10
      },
      isLoading: false,
      tableColumn,
      pageSizeList: [10, 20, 30, 40, 50],
      list: {
        content: [{"id": 1,
        "code": "201910111457",
        "vaildDate": 1572505295000,
        "status": 0,
        "name": "测试售后券",
        "price": 80.00}],
        total: 0
      }
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
    deleteTicket(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除吗？</p>",
        onOk: () => {
          console.log(111111111)
        }
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
