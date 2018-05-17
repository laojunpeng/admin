<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
      <Card>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="my-container" :label-width="80">
          <FormItem label="角色名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入角色名称"></Input>
          </FormItem>
          <FormItem label="账号备注" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入账号备注"></Input>
          </FormItem>
        </Form>
      </Card>
      <Card style="margin-top: 10px">
        <Transfer
          :data="data1"
          :target-keys="targetKeys1"
          :render-format="render1"
          :list-style="{width: 'calc(50% - 50px)', height: '300px'}"
          :titles="['其他角色','当前角色']"
          :operations="['删除','添加']"
          @on-change="handleChange1"></Transfer>
      </Card>
      </Col>
      <Col :span="6" style="padding-left: 10px">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          操作
        </p>
        <Button type="info" long>保存</Button>
        <Button type="warning" long style="margin-top: 10px">重置</Button>
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
          gender: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ]
        },
        data1: this.getMockData(),
        targetKeys1: this.getTargetKeys()
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
      },
      getMockData () {
        let mockData = [];
        for (let i = 1; i <= 20; i++) {
          mockData.push({
            key: i,
            label: '员工' + i,
            description: '内容' + i + '的描述信息'
          });
        }
        return mockData;
      },
      getTargetKeys () {
        let data = this.getMockData()
          .filter(e => {
            return e.key%2==0
          }).map(item => item.key);
        return data
      },
      render1 (item) {
        return item.label;
      },
      handleChange1 (newTargetKeys, direction, moveKeys) {
        console.log(newTargetKeys);
        console.log(direction);
        console.log(moveKeys);
        this.targetKeys1 = newTargetKeys;
      }
    }
  }
</script>
<style scoped>
  .my-container{width: 500px}
</style>
