<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
        <Card>
          <Table :loading="tableLoading" highlight-row stripe :columns="columns" :data="data"></Table>
        </Card>
      </Col>
      <Col :span="6" style="padding-left: 10px">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          操作
        </p>
        <Button type="info" @click="edit" long>新增</Button>
      </Card>
      <Card style="margin-top: 10px">
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          分页
        </p>
        <Page :current="pageData.pageNum" :total="pageData.total" simple @on-change="pageChange"></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {user_list_post,user_edit_post} from '../../api/index'
  export default {
    data() {
      return {
        tableLoading: false,
        columns: [
          {
            title: 'ID',
            key: 'id',
            align: 'center'
          },
          {
            title: '账号',
            key: 'name',
            align: 'center'
          },
          {
            title: '名称',
            key: 'userName',
            align: 'center'
          },
          {
            title: '角色',
            key: 'role',
            align: 'center'

          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              return params.row.status==1?'有效':'失效'
            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.edit(params)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small',
                    color: 'red'
                  },
                  on: {
                    click: () => {
                      this.delete(params)
                    }
                  }
                }, '改变状态')
              ]);
            }
          }
        ],
        data: [],
        pageData:{
          pageNum:1,
          pageSize:10,
          total:0
        }
      }
    },
    created(){
      this.initData();
    },
    methods: {
      initData(){
        let self = this;
        self.tableLoading = true;
        user_list_post({params:self.pageData}).then(e => {
          self.tableLoading = false;
          let result = e.data;
          if(result.code==200){
            self.$set(self,'data',result.data.records)
            console.info(result);
            self.pageData.pageNum = result.data.current
            self.pageData.pageSize = result.data.size
            self.pageData.total = result.data.total;
          }
        })
      },
      authorize(params) {
        let self = this;
        let id = params.row.id;
        self.$router.push({path: `/account/authorize`, query: {id}})
      },
      edit(params) {
        let self = this;
        let id = params.row ? params.row.id : 0;
        self.$router.push({path: `/account/detail`, query: {id}})
      },
      delete(params) {
        let self = this;
        let stateTxt = params.row.status==1?'失效':'有效'
        let newState = params.row.status==1?0:1;
        let postData = {};
        postData.id = params.row.id;
        postData.name = params.row.name;
        postData.status = newState;
        self.$Modal.confirm({
          title: stateTxt,
          content: '<p>确认改变账号状态为'+stateTxt+'吗？</p>',
          onOk: () => {
            user_edit_post({params:postData}).then(e => {
              let result = e.data;
              if(result.code==200){
                self.notice('success', 'success');
                self.initData();
              }
            })
          },
          onCancel: () => {
          }
        });
      },
      pageChange(params){
        let self = this;
        self.pageData.pageNum = params
        self.initData()
      }
    }
  }
</script>
<style scoped>

</style>
