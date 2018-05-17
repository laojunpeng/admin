<template>
  <i-menu :width="'auto'" :active-name="menuActive" @on-select="menuSelect">
    <router-link to="/"><div class="layout-logo-left">知伴科技</div></router-link>
    <MenuGroup title="权限管理" v-if="user&&user.role=='admin'">
      <MenuItem name="/account">
        <Icon type="man"></Icon>
        账号管理
      </MenuItem>
      <MenuItem name="/role">
        <Icon type="key"></Icon>
        角色管理
      </MenuItem>
    </MenuGroup>
    <MenuGroup title="维修单管理">
      <MenuItem name="/order">
        <Icon type="ios-list"></Icon>
        售后客服
      </MenuItem>
      <!--<MenuItem name="/geekfix">-->
        <!--<Icon type="ios-list"></Icon>-->
        <!--极客修-->
      <!--</MenuItem>-->
    </MenuGroup>
    <MenuGroup title="补料管理" v-if="user&&(user.role=='zib'||user.role=='admin')">
      <MenuItem name="/part">
        <Icon type="android-cart"></Icon>
        补料单
      </MenuItem>
      <MenuItem name="/item">
        <Icon type="ios-cog"></Icon>
        物料清单
      </MenuItem>
    </MenuGroup>
  </i-menu>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    computed:{
      menuActive(){
        return "/"+this.$route.path.split('/')[1];
      },
      ...mapState(['user'])
    },
    methods:{
      menuSelect(e){
        this.$router.push({path:e})
      }
    }
  }
</script>
<style scoped>

  .layout-logo-left {
    width: 90%;
    height: 30px;
    border-radius: 3px;
    margin: 15px auto;
    background: #2d8cf0;
    line-height: 30px;
    text-align: center;
    color: #FFF;
    font-size: 20px;
    font-weight: bolder;
  }
</style>
