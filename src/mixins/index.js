export default {
  methods:{
    notice(type,desc){
      let title = '通知';
      let duration = 1;
      if(type=="error"){
        this.$Notice.error({
          title,
          desc,
          duration
        });
      }else if(type=="info"){
        this.$Notice.info({
          title,
          desc,
          duration
        });
      }else if(type=="success"){
        this.$Notice.success({
          title,
          desc,
          duration
        });
      }else if(type=="warning"){
        this.$Notice.warning({
          title,
          desc,
          duration
        });
      }
    },
    dateFilter: function (value) {
      return new Date(value).toLocaleString()
    }
  },
  filters: {
    dateFilter: function (value) {
      return new Date(value).toLocaleString()
    }
  }
}
