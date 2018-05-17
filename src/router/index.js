import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  // base: '',
  routes
});

router.beforeEach((to, from, next) => {
  let userRole = store.state.user?store.state.user.role:'';
  if(to.path=="/login"){
    next();
  }else if(store.state.user){
    if(to.meta.role==''){
      next();
    }else if(to.meta.role=='admin'&&userRole=='admin'){
      next();
    }else if((userRole=='admin'||userRole=='zib')&&to.meta.role=='zib'){
      next();
    }else{
      router.replace({path:'/'})
    }
  }else{
    router.push({path:'/login'})
  }
})

export default router
