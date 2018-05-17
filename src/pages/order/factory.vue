<template>
  <div class="my-container">
    <Form :model="formItem" :label-width="120">
      <FormItem label="快递公司">
        <Select v-model="formItem.select" placeholder="请选择">
          <Option value="beijing">圆通</Option>
          <Option value="shanghai">顺丰</Option>
          <Option value="shenzhen">ems</Option>
        </Select>
      </FormItem>
      <FormItem label="快递单号">
        <Input v-model="formItem.input" placeholder="请输入"></Input>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          radio: 'male',
          checkbox: [],
          switch: true,
          date: '',
          time: '',
          slider: [20, 50],
          textarea: ''
        }
      }
    }
  }
</script>
<style scoped>
  .my-container{
    width: 500px;
  }
</style>
