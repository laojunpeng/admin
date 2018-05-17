<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
        <Card>
          <Table :loading="loading" border highlight-row stripe :columns="columns" align="center" :data="data"></Table>
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
        <Page :current="2" :total="50" simple></Page>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        loading: false,
        columns: [
          {
            title: 'ID',
            align: 'center',
            key: 'id'
          },
          {
            title: '名称',
            align: 'center',
            key: 'name'
          },
          {
            title: '库存',
            align: 'center',
            key: 'count'
          },
          {
            title: '状态',
            align: 'center',
            key: 'state'
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
                }, '删除')
              ]);
            }
          }
        ],
        data: [
          {
            name: '数据线',
            id: 18,
            state: '正常',
            count:99
          },
          {
            name: '数据线',
            id: 18,
            state: '正常',
            count:99
          },{
            name: '数据线',
            id: 18,
            state: '正常',
            count:99
          },{
            name: '数据线',
            id: 18,
            state: '正常',
            count:99
          },{
            name: '数据线',
            id: 18,
            state: '正常',
            count:99
          }
        ]
      }
    },
    methods: {
      edit(params) {
        let self = this;
        let id = params.row ? params.row.id : 0;
        self.$router.push({path: `/item/detail`, query: {id}})
      },
      delete(params) {
        let self = this;
        this.$Modal.confirm({
          title: '删除',
          content: '<p>确认删除账号吗？</p>',
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
      }
    }
  }
</script>
<style scoped>

</style>
