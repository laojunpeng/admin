import { timeFormat } from '@/utils/filter.js'
export default [
  {
    title: '编号',
    key: 'id',
    align: 'center'
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
    align: 'center',
    render: (h, params) => {
      if (params.row.expireType == 0) {
        return h('div', params.row.expireDays+'天')
      } else {
        return h(
          'div',
          timeFormat(params.row.expireBeginDate) +
            '至' +
            timeFormat(params.row.expireEndDate)
        )
      }
    }
  },
  {
    title: '状态',
    key: 'deleted',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.deleted == 0 ? '已上线' : '已删除')
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
