import { timeFormat } from '@/utils/filter.js';
import ticketUseStatus from '@/assets/json/ticketUseStatus.json'
export default [
  {
    title: '卡劵码',
    key: 'code',
    align: 'center'
  },
  {
    title: '购买用户',
    key: 'openId',
    align: 'center'
  },
  {
    title: '支付时间',
    key: 'payDate',
    align: 'center',
    render: (h, params) => {
      return h('div', params.row.payDate && timeFormat(params.row.payDate))
    }
  },
  {
    title: '当前状态',
    key: 'status',
    align: 'center',
    render: (h, params) => {
      return h(
        'div',
        (params.row.status || params.row.status >= 0) &&
          ticketUseStatus.find((e) => {
            return e.key === params.row.status
          }).value
      )
    }
  },
  {
    title: '使用时间',
    key: 'disableDate',
    align: 'center',
    render: (h, params) => {
      return h(
        'div',
        params.row.disableDate && timeFormat(params.row.disableDate)
      )
    }
  },
  {
    title: '订单编号',
    key: 'orderNum',
    align: 'center'
  },
  {
    title: '兑换操作账号',
    key: 'exchange_user',
    align: 'center'
  },
  {
    title: '操作',
    key: 'operation',
    slot: 'operation',
    width: 200,
    align: 'center'
  }
]
