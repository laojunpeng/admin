import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let user = localStorage.getItem('user');
if( user ){
  user = JSON.parse(user);
}else{
  user = null
}

let accessToken = localStorage.getItem('accessToken');
if( accessToken ){
  accessToken = accessToken;
}else{
  accessToken = null;
}


const store = new Vuex.Store({
  state: {
    user:user,
    accessToken:accessToken
  },
  mutations: {
    setUser(state, {user,accessToken}){
      state.user = user;
      state.accessToken =accessToken;
      if(user){
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('accessToken', accessToken);
      }else{
        localStorage.setItem('user', null);
        localStorage.setItem('accessToken', null);
      }
    },
  }
});
export default store
