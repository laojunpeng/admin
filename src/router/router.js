const Default = () => import('../layout/default.vue');
const Index = () => import('../pages/index.vue');
const Account = () => import('../pages/account/index.vue');
const AccountDetail = () => import('../pages/account/detail.vue');
const Item = () => import('../pages/item/index.vue');
const ItemDetail = () => import('../pages/item/detail.vue');
const Order = () => import('../pages/order/index.vue');
const OrderDetail = () => import('../pages/order/detail.vue');
const Part = () => import('../pages/part/index.vue');
const PartDetail = () => import('../pages/part/detail.vue');
const Role = () => import('../pages/role/index.vue');
const RoleDetail = () => import('../pages/role/detail.vue');
const RoleAuthorize = () => import('../pages/role/authorize.vue');
const TicketList = () => import('../pages/ticket/list.vue');
const TicketDetail = () => import('../pages/ticket/detail.vue');
const TicketEdit = () => import('../pages/ticket/edit.vue')

const Login = () => import('../pages/login.vue');

export default [
  {
    path: '/login',
    name: '登录',
    meta: {
      role: ''
    },
    component: Login
  },
  {
    path: '/',
    name: '',
    component: Default,
    children: [
      {
        path: '',
        name: '',
        meta: {
          role: ''
        },
        component: Index
      },
      {
        path: 'account',
        name: '账号管理',
        meta: {
          role: 'zib'
        },
        component: Account
      },
      {
        path: 'account/detail',
        name: '账号管理/详情',
        meta: {
          role: ''
        },
        component: AccountDetail
      },
      {
        path: 'item',
        name: '物料清单',
        meta: {
          role: 'zib'
        },
        component: Item
      },
      {
        path: 'item/detail',
        name: '物料清单/详情',
        meta: {
          role: 'zib'
        },
        component: ItemDetail
      },
      {
        path: 'order',
        name: '售后客服',
        meta: {
          role: ''
        },
        component: Order
      },
      {
        path: 'order/detail',
        name: '售后客服/详情',
        meta: {
          role: ''
        },
        component: OrderDetail
      },
      {
        path: 'part',
        name: '补料单',
        meta: {
          role: 'zib'
        },
        component: Part
      },
      {
        path: 'part/detail',
        name: '补料单/详情',
        meta: {
          role: 'zib'
        },
        component: PartDetail
      },
      {
        path: 'role',
        name: '角色管理',
        meta: {
          role: 'zib'
        },
        component: Role
      },
      {
        path: 'role/detail',
        name: '角色管理/详情',
        meta: {
          role: 'zib'
        },
        component: RoleDetail
      },
      {
        path: 'role/authorize',
        name: '角色管理/授权',
        meta: {
          role: 'zib'
        },
        component: RoleAuthorize
      },
      {
        path: 'ticket',
        name: '卡券列表',
        meta: {
          role: ''
        },
        component: TicketList
      },
      {
        path: 'ticket/detail',
        name: '卡券列表/详情',
        meta: {
          role: ''
        },
        component: TicketDetail
      },
      {
        path: 'ticket/edit',
        name: '卡券列表/添加卡券',
        meta: {
          role: ''
        },
        component: TicketEdit
      }
    ]
  },
  {
    path: '*',
    component: Default,
    children: [
      {
        path: '/',
        name: '',
        meta: {
          role: ''
        },
        component: Index
      }
    ]
  }
]
