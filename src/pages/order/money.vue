<template>
  <div class="my-container">
    <Form :model="formItem" :label-width="120">
      <FormItem label="付款状态：">
        <Select v-model="formItem.state" style="width:200px">
          <Option :value="0">未付款</Option>
          <Option :value="1">已付款</Option>
        </Select>
      </FormItem>
      <FormItem label="客户付款截图：">
        <img src="../../assets/image/184739vqranvea0ha0faoa.jpg" />
      </FormItem>
    </Form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formItem: {
          state: 0
        }
      }
    },
    mounted() {

    }
  }
</script>
<style scoped>
  .my-container{
    width: 500px;
  }
</style>
