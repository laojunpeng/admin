<template>
  <div class="my-container">
    <Card>
      <p slot="title">机器ID：{{machine.id}}</p>
      <Collapse value="0">
        <Panel name="0">
          客户填写：
          <div slot="content">
            <Form :model="machine" :label-width="80">
              <FormItem label="机器人类型">
                <Select v-model="machine.type" placeholder="请选择" disabled>
                  <Option :value="1">微信版机器人</Option>
                  <Option :value="5">1X机器人</Option>
                  <Option :value="6">小K机器</Option>
                  <Option :value="3">小Z机器人</Option>
                  <Option :value="0">App版机器人</Option>
                  <Option :value="4">定制版机器</Option>
                  <Option :value="7">逻辑思维训练机</Option>
                  <Option :value="8">智能护眼仪</Option>
                </Select>
              </FormItem>
              <FormItem label="设备号">
                <Input v-model="machine.deviceSn" disabled></Input>
              </FormItem>
              <FormItem label="问题描述">
                <Input v-model="machine.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" disabled></Input>
              </FormItem>
              <FormItem label="描述图片">
                <div class="pic-content">
                  <img v-for="(item,index) in robotImg" :key="index" @click="showPic(abURL+item)" :src="abURL+item" />
                </div>
              </FormItem>
            </Form>
          </div>
        </Panel>
        <Panel name="0">
          维修情况：
          <div slot="content">
            <template v-if="repair[repairIndex]">
              <Form :model="repair[repairIndex]" :label-width="80">
                <p>维修前检视：</p>
                <FormItem label="外观">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].exterior}}
                  </template>
                  <template v-else>
                    <Select v-model="repair[repairIndex].exterior" multiple placeholder="请选择">
                      <Option value="wechat">开不了机</Option>
                      <Option value="app">按键凹陷</Option>
                    </Select>
                  </template>
                </FormItem>
                <FormItem label="配件">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].parts}}
                  </template>
                  <template v-else>
                    <Select v-model="repair[repairIndex].parts" multiple placeholder="请选择">
                      <Option value="wechat">开不了机</Option>
                      <Option value="app">按键凹陷</Option>
                    </Select>
                  </template>
                </FormItem>
                <FormItem label="设备号">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].deviceSn}}
                  </template>
                  <template v-else>
                    <Input v-model="repair[repairIndex].deviceSn" placeholder="请输入"></Input>
                  </template>
                </FormItem>
                <FormItem label="维修前图片" v-if="repairBeforePic!=''">
                  <div class="pic-content">
                    <img v-for="(item,index) in repairBeforePic" :key="index" @click="showPic(abURL+item)" :src="abURL+item" />
                  </div>
                </FormItem>
                <p>检测故障说明：</p>
                <FormItem label="故障">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].fault}}
                  </template>
                  <template v-else>
                    <Select v-model="repair[repairIndex].fault" multiple placeholder="请选择">
                      <Option value="wechat">开不了机</Option>
                      <Option value="app">按键凹陷</Option>
                    </Select>
                  </template>
                </FormItem>
                <FormItem label="故障说明">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].faultDesc}}
                  </template>
                  <template v-else>
                    <Input v-model="repair[repairIndex].faultDesc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                  </template>
                </FormItem>
                <FormItem label="是否人为">
                  <template v-if="repairDisable">
                    <template v-if="repair[repairIndex].manmade==1">
                      人为
                    </template>
                    <template v-if="repair[repairIndex].manmade==0">
                      非人为
                    </template>
                    <template v-if="repair[repairIndex].manmade==2">
                      无法确定，请联系极客修确定
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="repair[repairIndex].manmade==1||repair[repairIndex].manmade==0">
                      <i-switch v-model="repair[repairIndex].manmade" :true-value="1" :false-value="0">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                      </i-switch>
                    </template>
                    <template>
                      无法确定，请联系极客修确定
                    </template>
                  </template>
                </FormItem>
                <FormItem label="维修故障点图片" v-if="repairPointPic!=''">
                  <div class="pic-content">
                    <img v-for="(item,index) in repairPointPic" :key="index" @click="showPic(abURL+item)" :src="abURL+item" />
                  </div>
                </FormItem>
                <FormItem label="维修后图片" v-if="repairAfterPic!=''">
                  <div class="pic-content">
                    <img v-for="(item,index) in repairAfterPic" :key="index" @click="showPic(abURL+item)" :src="abURL+item" />
                  </div>
                </FormItem>
                <FormItem label="收费金额">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].chargeAmount}}
                  </template>
                  <template v-else>
                    <InputNumber :max="10000" :min="0" v-model="repair[repairIndex].chargeAmount">
                      <span slot="append">元</span>
                    </InputNumber>
                  </template>
                </FormItem>
                <FormItem label="收费图片" v-if="chargePic!=''">
                  <div class="pic-content">
                    <img v-for="(item,index) in chargePic" :key="index" @click="showPic(abURL+item)" :src="abURL+item" />
                  </div>
                </FormItem>
                <FormItem label="收款说明">
                  <template v-if="repairDisable">
                    {{repair[repairIndex].chargeDetail}}
                  </template>
                  <template v-else>
                    <Input v-model="repair[repairIndex].chargeDetail" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                  </template>
                </FormItem>
              </Form>
            </template>
            <template v-else>
              暂无信息
            </template>
          </div>
        </Panel>
      </Collapse>
    </Card>
    <Modal v-model="modal1" class="modal">
      <img v-if="modalSrc" :src="modalSrc">
    </Modal>
  </div>
</template>
<script>
export default {
  props: ["machine", "repair", "repairIndex"],
  data() {
    return {
      modal1: false,
      modalSrc: "",
      repairDisable: true,
      //        abURL:'http://csc.zhibankeji.com/'
      abURL: ""
    };
  },
  mounted() {},
  methods: {
    showPic(e) {
      this.modal1 = true;
      this.modalSrc = e;
    }
  },
  computed: {
    robotImg() {
      return this.machine.picUrl ? this.machine.picUrl.split(",") : "";
    },
    chargePic() {
      return this.repair[this.repairIndex].chargePic
        ? this.repair[this.repairIndex].chargePic.split(",")
        : "";
    },
    repairAfterPic() {
      return this.repair[this.repairIndex].repairAfterPic
        ? this.repair[this.repairIndex].repairAfterPic.split(",")
        : "";
    },
    repairBeforePic() {
      return this.repair[this.repairIndex].repairBeforePic
        ? this.repair[this.repairIndex].repairBeforePic.split(",")
        : "";
    },
    repairPointPic() {
      return this.repair[this.repairIndex].repairPointPic
        ? this.repair[this.repairIndex].repairPointPic.split(",")
        : "";
    }
  }
};
</script>
<style scoped>
.my-container {
  padding: 0 20px 10px;
}

.ivu-card {
  margin-bottom: 10px;
}

.pic-content {
  display: flex;
  width: 100%;
}

.pic-content img {
  display: block;
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.pic-content img + img {
  margin-left: 10px;
}

.modal img {
  display: block;
  width: 100%;
}
</style>
