<template>
  <div class="express">
    <template v-for="(item,index) in expressInfo">
      <div :key="index" style="margin-bottom:20px">
        <p>创建人：{{item.creater||'暂无'}}</p>
        <p>快递单号：{{item.expressNum||'暂无'}}</p>
        <p>快递公司：{{item.expressCompany||'暂无'}}</p>
        <p>备注：{{item.remark||'暂无'}}</p>
      </div>
    </template>
    <div v-if="!expressInfo||expressInfo.length==0">暂无快递信息</div>
  </div>
</template>

<script>
import * as api from "@/api/";
export default {
  props: ["orderId"],
  data() {
    return {
      expressInfo: []
    };
  },
  created() {
    api.order_express_get({ params: { orderId: this.orderId } }).then(e => {
      let result = e.data;
      if (result.code == 200) {
        this.expressInfo = result.data;
      }
    });
  }
};
</script>

<style scoped>
.express{
  padding: 20px
}
</style>
