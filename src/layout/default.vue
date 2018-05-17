<template>
  <div class="layout">
    <Row type="flex" class="common-container">
      <Col class="layout-menu-left">
      <left-menu></left-menu>
      </Col>
      <Col class="layout-right">
      <div class="layout-header">
        <breadcrumb-nav :currentRoute="currentRoute"></breadcrumb-nav>
        <div class="header-avator-con">
          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <template v-if="user">
                    <span class="main-user-name">{{user.name || ""}}</span>
                  </template>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar icon="person" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <div class="layout-copy">
        2016-2017 &copy; ZIB
      </div>
      </Col>
    </Row>
    <BackTop :height="100"></BackTop>
    <Modal v-model="logoutModal" width="360" class-name="vertical-center-modal" @on-cancel="logoutCancel"
           :closable="!logoutModalLoading" :mask-closable="!logoutModalLoading">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>登出确认</span>
      </p>
      <div style="text-align:center">
        <p>请确认登出！</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="logoutModalLoading" @click="logout">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import BreadcrumbNav from '../components/breadcrumbNav'
  import LeftMenu from '../components/LeftMenu.vue'
  import {mapState} from 'vuex'
  import {logout_post} from '../api/index'

  export default {
    data() {
      return {
        logoutModal: false,
        logoutModalLoading: false,
        currentRoute: [],
        avatorPath: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
      }
    },
    created() {
      this.setCurrentRoute(this.$route)
    },
    beforeRouteUpdate(to, from, next) {
      this.setCurrentRoute(to);
      next();
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {

      //设置面包屑
      setCurrentRoute(e) {
        let self = this;
        let result = [];
        let names = e.name ? e.name.split('/') : [];
        let paths = e.path ? e.path.split('/') : [];
        paths.shift();
        for (let i = 0; i < names.length; i++) {
          paths[i] = paths[i] == '' ? '/' : paths[i];
          result.push({name: names[i], path: paths[i]});
        }
        self.$set(self, 'currentRoute', result);
      },
      handleClickUserDropdown(name) {
        let self = this;
        if (name === 'ownSpace') {
          let id = self.$store.state.user.id
          self.$router.push({path: `/account/detail`, query: {id}})
        } else if (name === 'loginout') {
          self.logoutModal = true;
        }
      },
      logout() {
        let self = this;
        self.logoutModalLoading = true;
        logout_post({params: {token: 'QEdaemliIQ=='}}).then(e => {
          self.logoutModalLoading = false;
          self.$store.commit('setUser', {user: null, accessToken: null});
          self.$router.push({path:'/login'})
        })
      },
      logoutCancel() {
        let self = this;
        if (false)
          self.logoutModal = false;
      }
    },
    components: {
      BreadcrumbNav, LeftMenu
    },
  }
</script>
<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
  }

  .layout-right {
    width: calc(100% - 200px) !important;
  }

  .layout-content-main {
    padding: 10px;
  }

  .layout-copy {
    text-align: center;
    padding: 20px 0 20px;
    color: #9ea7b4;
    background: #FFF;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, .1);
  }

  .layout-menu-left {
    width: 200px !important;
    background: #FFF;
    border-right: 1px solid #CCC;
  }

  .layout-header {
    height: 60px;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

  .ivu-menu-vertical.ivu-menu-light:after {
    width: 0;
  }

  .header-avator-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 300px;
  }

  .header-avator-con .user-dropdown-innercon {
    height: 100%;
    padding-right: 14px;
  }

  .user-dropdown-menu-con {
    position: absolute;
    right: 0;
    top: 0;
    width: 150px;
    height: 100%;
  }

</style>
<style>
  .ivu-modal-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ivu-modal {
    top: 0;
  }
</style>

