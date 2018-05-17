<template>
  <Steps :current="status-1" class="step" direction="vertical">
    <template v-for="(item,index) in step">
      <Step :title="item.name" ></Step>
    </template>
  </Steps>
</template>
<script>
  import axios from 'axios'
  export default {
    props: {
      status: {
        type:Number,

      }
    },
    data() {
      return {
        step:[]
      }
    },
    mounted() {

    },
    created(){
      let self = this;
      axios.get('static/data/status.json').then(e => {
        self.$set(self,'step',e.data)
      })
    }
  }
</script>
<style>

</style>
