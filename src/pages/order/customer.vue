<template>
  <div class="my-container">
    <Form ref="customerForm" :model="customerForm" :label-width="120" :rules="rules">
      <FormItem label="创建时间：" v-show="orderState>1">
        {{customerForm.createDate|dateFilter}}
      </FormItem>
      <FormItem label="订单状态：">
        {{stateName}}
      </FormItem>
      <FormItem label="关闭信息：" v-show="customerForm.closeDesc">
        {{customerForm.closeDesc}}
      </FormItem>
      <FormItem label="维修单位：" prop="supply">
        <Select v-model="customerForm.supply" placeholder="请选择">
          <Option value="极客修">极客修</Option>
          <Option value="创美佳">创美佳</Option>
          <Option value="金大" disabled>金大</Option>
          <Option value="创投小镇">创投小镇</Option>
          <Option value="丰修">丰修</Option>
          <Option value="闪修侠">闪修侠</Option>
        </Select>
      </FormItem>
      <FormItem label="极客修订单号：" v-show="customerForm.jkxOrderId">
        {{customerForm.jkxOrderId}}
      </FormItem>
      <FormItem label="客服备注：" prop="remark">
        <Input v-model="customerForm.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
               placeholder="请输入..."></Input>
      </FormItem>
      <template v-if="orderState>1">
        <FormItem label="姓名：" prop="name">
          <Input v-model="customerForm.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="性别：" prop="sex">
          <RadioGroup v-model="customerForm.sex" type="button">
            <Radio :label="1">先生</Radio>
            <Radio :label="0">女士</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="电话号码：" prop="mobile">
          <Input v-model="customerForm.mobile" placeholder="请输入"></Input>
        </FormItem>
             <FormItem label="省份：" prop="province">
          <Input v-model="customerForm.province" placeholder="请输入"></Input>
        </FormItem>
             <FormItem label="城市：" prop="city">
          <Input v-model="customerForm.city" placeholder="请输入"></Input>
        </FormItem>
             <FormItem label="地区：" prop="area">
          <Input v-model="customerForm.area" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="地址：" prop="address">
          <Input v-model="customerForm.address" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="快递单号：" prop="trackingNum">
          <Input v-model="customerForm.trackingNum" placeholder="请输入"></Input>
        </FormItem>
      </template>
    </Form>
  </div>
</template>
<script>
  import statusData from '../../../static/data/status.json'
  export default {
    props: {
      customerForm: {
        type: Object,
        default: function () {
          return {
            remark: '',
            supply: '极客修',
            sex : 1,
            name:'',
            mobile:'',
            trackingNum:'',
            jkxRepairDate:'',
            status:'',
            address:'',
            jkxOrderId:''
          }
        }
      },
      orderState: {
        type: Number
      },
      rules:{
        type: null
      }
    },
    data(){
      return {
      }
    },
    computed:{
      stateName (){
        return this.orderState==0?'订单失效':statusData[this.orderState-1].name
      }
    }
  }
</script>
<style scoped>
  .my-container {
    width: 500px;
    min-height: 500px;
  }
</style>
