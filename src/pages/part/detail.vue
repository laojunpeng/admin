<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
      <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="my-container" :label-width="80">
          <FormItem label="ID">
            <Input v-model="formValidate.id" disabled></Input>
          </FormItem>
          <FormItem label="录入日期">
            <Input v-model="formValidate.date" disabled></Input>
          </FormItem>
          <FormItem label="客户上家" prop="agent">
            <Input v-model="formValidate.agent" placeholder="请输入客户上家"></Input>
          </FormItem>
          <FormItem label="客户姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入客户姓名"></Input>
          </FormItem>
          <FormItem label="电话号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="请输入电话号码"></Input>
          </FormItem>
          <FormItem label="地址" prop="address">
            <Input v-model="formValidate.address" placeholder="请输入地址"></Input>
          </FormItem>
          <FormItem label="账号备注" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入账号备注"></Input>
          </FormItem>
          <FormItem
            v-for="(item, index) in formValidate.items"
            :key="index"
            :label="'物料' + (index + 1)"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: '物料' + (index + 1) +'不能为空', trigger: 'blur'}">
            <Row>
              <Col span="13">
              <Select v-model="item.name">
                <Option v-for="sub in itemList" :value="sub.id" :key="sub.id">{{ sub.name }}</Option>
              </Select>
              </Col>
              <Col span="5" offset="1">
              <InputNumber :max="10" :min="1" v-model="item.count"></InputNumber>
              </Col>
              <Col span="4" offset="1">
              <Button type="ghost" @click="handleRemove(index)">删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
              <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
              </Col>
            </Row>
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
          name: '',
          phone: '',
          address:'',
          agent:'',
          desc: '',
          date:'2017-01-01',
          items:[
            {name:'',count:1}
          ]
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '电话号码不能为空', trigger: 'blur'},
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'}
          ]
        },
        itemList:[
          {
            name:'数据线',
            id:1
          },
          {
            name:'说明书',
            id:2
          }
        ]
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
      handleAdd () {
        this.formValidate.items.push({
          value: ''
        });
      },
      handleRemove (index) {
        this.formValidate.items.splice(index, 1);
      }
    }
  }
</script>
<style scoped>
  .my-container{width: 500px}
</style>
