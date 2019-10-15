
export default [
  {
    title: '编号',
    key: 'id',
    align: 'center',
    width: 100
  },
  {
    title: '卡券名称',
    key: 'name',
    align: 'center'
  },
  {
    title: '售价',
    key: 'price',
    align: 'center'
  },
  {
    title: '有效期',
    key: 'vaildDate',
    align: 'center'
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.status == 0 ? '无效' : '有效')
    }
  },
  {
    title: '操作',
    key: 'operation',
    slot: 'operation',
    width: 200,
    align: 'center'
  }
]
