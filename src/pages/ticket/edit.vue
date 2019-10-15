<template>
  <div class="common-layout-container">
    <Card>
      <Form class='form' :model="formData" ref="form" :label-width="120">
        <Row>
          <Col span="12">
            <FormItem label="卡券名称：" prop="name" :rules="[{required: true, message: '请输入卡券名称', trigger: 'blur' }]">
              <Input type="text" v-model.trim="formData.name" placeholder="请输入卡券名称" style="width:300px" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="售价：" prop="price" :rules="[{required: true, type: 'number', message: '请输入售价', trigger: 'blur' }]">
              <InputNumber :min="0.01" :max="10000" v-model="formData.price" placeholder="请输入" />
              <span style="margin-left:10px">元</span>
              <p style="color: #c9c9c9">售价只能是数值，0.01-10000，限2位小数</p>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="有效期：" prop="expireType">
              <RadioGroup v-model="formData.expireType">
                <Radio :label="0"> 固定天数</Radio>
                <Radio :label="1">日期范围</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12" v-if="formData.expireType==0">
            <FormItem label="固定天数：" prop="expireDays" :rules=" [{required: formData.expireType==0, type: 'integer', message: '请输入固定天数', trigger: 'blur' },{ type: 'integer',message: '数值必须为整数'}]">
              <InputNumber :min="0" v-model="formData.expireDays" placeholder="请输入固定天数" />
              <span style="margin-left:10px">天</span>
            </FormItem>
          </Col>
          <Col span="12" v-if="formData.expireType==1">
            <FormItem label="日期范围：" :required="formData.expireType==1" prop="expirDateRange" :rules="validDate">
              <DatePicker v-model="formData.expirDateRange" type="daterange" @on-change="expirDateChange" confirm transfer placeholder="请选择日期范围" style="width: 210px"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="备注：">
              <Input v-model="formData.remark" type="textarea" :rows="4" placeholder="请输入备注" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="btn-g">
        <Button @click="submit" type="primary">确认</Button>
        <Button @click="$router.go(-1)">返回</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import {timeFormat} from '@/utils/filter.js'

export default {
  data () {
    return {
      id: this.$route.query.id,
      formData: {
        expireType: 0,
        price: 0.01,
        expireDays: 0,
        expirDateRange: [],
      },
      validDate: [{
        type: 'array', required: true,
        fields: {
          0: {type: 'date', required: true, message: '请选择日期范围', trigger: 'blur'},
          1: {type: 'date', required: true, message: '请选择日期范围', trigger: 'blur'}
        }
      }]
    }
  },
  created () {

  },
  watch: {
    id: {
      immediate: true,
      handler: function(id) {
        if(id) {
          this.loadData(id);
        }
      }
    }
  },
  methods: {
    loadData(id) {},
    expirDateChange(e) {
      this.formData.expireBeginDate = new Date(e[0]).getTime();
      this.formData.expireEndDate = new Date(e[1]).getTime();
    },
    submit() {
      this.$refs.form.validate(e => {
        console.log(e, 'valid')
        if (!e) return;
        let params = JSON.parse(JSON.stringify(this.formData));
        delete params.expirDateRange;
      })
    },
    dateFormat(val) {
      return val && new Date(val) != "Invalid Date" ? val : "";
    },
  }
}
</script>

<style scoped>
.common-layout-container{
  padding: 10px;
}
.btn-g {
  text-align: center;
}

.btn-g>button+button {
  margin-left: 20px;
}
</style>
