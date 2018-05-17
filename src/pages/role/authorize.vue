<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
      <Card>
        <div class="layout-content">
          <Row>
            <Col span="4" offset="1" style="margin-bottom: 10px">
            <Card>
              <p slot="title">角色管理</p>
              <p>
                <i-switch size="large" v-model="switch1"><span slot="open">开启</span>
                  <span slot="close">关闭</span></i-switch>
                查询
              </p>
              <p>
                <i-switch size="large" v-model="switch2"><span slot="open">开启</span>
                  <span slot="close">关闭</span></i-switch>
                修改
              </p>
            </Card>
            </Col>
            <Col span="4" offset="1" style="margin-bottom: 10px">
            <Card>
              <p slot="title">补料单审批</p>
              <div>
                <Select v-model="model1">
                  <Option :value="1" >初级</Option>
                  <Option :value="2" >中级</Option>
                </Select>
              </div>
            </Card>
            </Col>
            <Col span="4" offset="1" style="margin-bottom: 10px" v-for="(item,index) in 20" :key="index">
            <Card>
              <p slot="title">角色管理</p>
              <div>
                <i-switch size="large" v-model="switch1"><span slot="open">开启</span>
                  <span slot="close">关闭</span></i-switch>
                查询
              </div>
              <div>
                <i-switch size="large" v-model="switch2"><span slot="open">开启</span>
                  <span slot="close">关闭</span></i-switch>
                修改
              </div>
            </Card>
            </Col>
          </Row>
        </div>
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
        switch1: false,
        switch2: false,
        switch3: false,
        model1:1
      }
    },
    mounted() {
      let self = this;
      console.info(self.$route.query);
    },
    methods: {}
  }
</script>
<style scoped>
  .ivu-card-body p .ivu-switch {
    margin-right: 10px;
  }

  .ivu-card-body > div{
    line-height: 30px;
  }
</style>
