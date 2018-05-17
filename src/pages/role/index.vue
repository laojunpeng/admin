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
        <Page :current="pageData.pageNum" :page-size="pageData.pageSize" :total="pageData.total" simple
              @on-change="changePage"></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import {role_list_post} from '../../api'

  export default {
    data() {
      return {
        tableLoading:false,
        loading: false,
        columns: [
          {
            title: 'ID',
            key: 'id'
          },
          {
            title: '角色名称',
            key: 'name'
          },
          {
            title: '角色描述',
            key: 'descript'
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
                      this.authorize(params)
                    }
                  }
                }, '授权'),
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
                }, '删除')
              ]);
            }
          }
        ],
        data: [],
        pageData: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    created(){
      this.initData();
    },
    methods: {
      initData() {
        let self = this;
        self.tableLoading = true;
        role_list_post({params:self.pageData}).then(e => {
          self.tableLoading = false;
          let result = e.data;
          if(result.code==200){
            console.info(result.data.records);
            self.$set(self,'data',result.data.records);
            self.$set(self.pageData,'total',result.data.total)
          }
        })
      },
      authorize(params) {
        let self = this;
        let id = params.row.id;
        self.$router.push({path: `/role/authorize`, query: {id}})
      },
      edit(params) {
        let self = this;
        let id = params.row ? params.row.id : 0;
        self.$router.push({path: `/role/detail`, query: {id}})
      },
      delete(params) {
        let self = this;
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认删除该角色吗？</p>',
          onOk: () => {
            self.data.splice(params.index, 1);
            this.$Notice.success({
              title: '通知',
              desc: '成功删除！'
            });
          },
          onCancel: () => {
          }
        });
      },
      changePage(index) {
        let self = this;
        self.$set(self.pageData, 'pageNum', index)
        self.initData();
      }
    }
  }
</script>
<style scoped>

</style>
