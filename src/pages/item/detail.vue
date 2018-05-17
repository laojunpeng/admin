<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
      <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="my-container" :label-width="80">
          <FormItem label="ID">
            <Input v-model="formValidate.id" disabled></Input>
          </FormItem>
          <FormItem label="物料状态" prop="state">
            <Select v-model="formValidate.state" >
              <Option :value="0">下架</Option>
              <Option :value="1">正常</Option>
            </Select>
          </FormItem>
          <FormItem label="物料名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入物料名称"></Input>
          </FormItem>
          <FormItem label="物料库存" prop="count">
            <InputNumber :min="0" v-model="formValidate.count"></InputNumber>
          </FormItem>
          <FormItem label="物料备注" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入物料备注"></Input>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col :span="6" style="padding-left: 10px">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          操作
        </p>
        <Button type="info" long>保存</Button>
        <Button type="warning" long style="margin-top: 10px" @click="handleReset('formValidate')">重置</Button>
        <Button long style="margin-top: 10px">取消</Button>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formValidate: {
          id:0,
          name:'',
          count:99,
          desc:'',
          state:1
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          count: [
            {required: true, message: '库存不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.formValidate.items = [{name:'',count:1}];
      },
    }
  }
</script>
<style scoped>
  .my-container{width: 500px}
</style>
