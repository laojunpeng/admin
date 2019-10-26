<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.name" placeholder="请输入用户名">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {login_post} from '../api/index'
  import { Base64 } from 'js-base64';
  export default {
    data() {
      return {
        loading: false,
        form: {
          name: '',
          password: '',
          token: ''
        },
        rules: {
          name: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSubmit() {
        let self = this;
        self.$refs.loginForm.validate((valid) => {
          if (valid) {
            self.loading = true;
            login_post({
              headers: {
                authorization: 'QEdaemliIQ==',
                token: 'QEdaemliIQ=='
              },
              params: {
                name: self.form.name,
                password: Base64.encode("@GZzib!"+self.form.password)
                // password: self.form.password

              }
            }).then(e => {
              self.loading = false;
              let result = e.data;
              if (result.code == 200) {
                let data = result.data;
                self.$store.commit('setUser', {user:data.user,accessToken:data.accessToken});
                self.$router.push({
                  path: '/index'
                });
              }
            })
          }
        });
      }
    }
  };
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url('../../static/img/login_bg.jpg');
    background-size: cover;
    background-position: center;
  }

  .login-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
  }

  .login-header {
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
  }

  .form-con {
    padding: 10px 0 0;
  }

  .login-tip {
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
  }
</style>
