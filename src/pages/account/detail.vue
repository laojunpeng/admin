<template>
  <div class="common-layout-container">
    <Row class="layout-content">
      <Col :span="18">
      <Card>
        <Form ref="accountForm" :model="accountForm" :rules="this.$route.query.id==0?ruleValidate:{}"
              class="my-container" :label-width="80">
          <FormItem label="账号名称" prop="name">
            <Input :disabled="this.$route.query.id!=0" v-model="accountForm.name" placeholder="请输入账号名称"></Input>
          </FormItem>
          <FormItem label="姓名" prop="userName">
            <Input v-model="accountForm.userName" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="电话号码" prop="mobile">
            <Input v-model="accountForm.mobile" placeholder="请输入电话号码"></Input>
          </FormItem>
          <FormItem label="邮箱地址" prop="email">
            <Input v-model="accountForm.email" placeholder="请输入邮箱地址"></Input>
          </FormItem>
          <FormItem label="密码" prop="password" v-if="this.$store.state.user.name==accountForm.name">
            <template v-if="this.$route.query.id!=0">
              <Button class="passwordBtn" type="text" size="small" @click="showEditPassword">修改密码</Button>
            </template>
            <template v-else>
              初始密码为123456，请尽快修改密码！
            </template>
          </FormItem>
        </Form>
      </Card>
      </Col>
      <Col :span="6" style="padding-left: 10px">
      <Card>
        <p slot="title">
          <Icon type="paper-airplane"></Icon>
          操作
        </p>
        <Button type="info" long @click="save">保存</Button>
        <Button long style="margin-top: 10px" @click="cancel">取消</Button>
      </Card>
      </Col>
    </Row>
    <template v-if="this.$store.state.user.name==accountForm.name">
      <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
        <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
        <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right"
              :rules="passwordValidate">
          <FormItem label="原密码" prop="oldPass" :error="oldPassError">
            <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码"></Input>
          </FormItem>
          <FormItem label="新密码" prop="newPass">
            <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符"></Input>
          </FormItem>
          <FormItem label="确认新密码" prop="rePass">
            <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码"></Input>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" @click="cancelEditPass">取消</Button>
          <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
        </div>
      </Modal>
    </template>
  </div>
</template>
<script>
  import {user_edit_post, user_detail_post} from '../../api/index'
  import {Base64} from 'js-base64'

  export default {
    data() {
      const valideRePassword = (rule, value, callback) => {
        if (value !== this.editPasswordForm.newPass) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      return {
        accountForm: {
          userName: '',
          name: '',
          phone: '',
        },
        ruleValidate: {
          name: [
            {required: true, message: '账号不能为空', trigger: 'blur', disable: true}
          ],
        },
        editPasswordModal: false,
        editPasswordForm: {
          oldPass: '',
          newPass: '',
          rePass: ''
        },
        passwordValidate: {
          oldPass: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, message: '请至少输入6个字符', trigger: 'blur'},
            {max: 32, message: '最多输入32个字符', trigger: 'blur'}
          ],
          rePass: [
            {required: true, message: '请再次输入新密码', trigger: 'blur'},
            {validator: valideRePassword, trigger: 'blur'}
          ]
        },
        oldPassError: '',
        savePassLoading: false,
      }
    },
    created() {
      let self = this;
      let id = self.$route.query.id;
      let user = self.$store.state.user
      if(user.role!='admin'&&id!=user.id){
        self.notice('error', '非法操作')
        self.$router.replace('/')
      }else{
        if (id && id != 0) {
          user_detail_post({params: {id: id}}).then(e => {
            let result = e.data;
            if (result.code == 200) {
              let data = {};
              data.name = result.data.name;
              data.userName = result.data.userName;
              data.email = result.data.email;
              data.mobile = result.data.mobile;
              data.status = result.data.status;
              self.$set(self, 'accountForm', data)
            }
          })
        }
      }
    },
    methods: {
      showEditPassword() {
        this.editPasswordModal = true;
      },
      saveEditPass() {
        let self = this;
        self.$refs['editPasswordForm'].validate((valid) => {
          if (valid) {
            self.savePassLoading = true;
            let postData = {};
            postData.id = self.$route.query.id;
            postData.name = self.accountForm.name;
            postData.password = Base64.encode("@GZzib!" + self.editPasswordForm.newPass);
            postData.oldPassword = Base64.encode("@GZzib!" + self.editPasswordForm.oldPass);
            postData.status = 1;
            user_edit_post({params: postData}).then(e => {
              self.savePassLoading = false;
              let data = e.data;
              if (data.code == 200) {
                self.notice('success', 'success')
                self.editPasswordModal = false;
                self.$refs['editPasswordForm'].resetFields();
              }
            })
          }
        });
      },
      cancelEditPass() {
        this.editPasswordModal = false;
      },
      save() {
        let self = this;
        let id = self.$route.query.id;
        let postData;
        postData = self.accountForm;
        if (id && id != 0) {
          postData.id = id;
        } else {
          postData.password = Base64.encode("@GZzib!123456");
        }
        self.$refs.accountForm.validate((valid) => {
//          console.info(self.accountForm);
          if (valid) {
            user_edit_post({params: postData}).then(e => {
              let data = e.data;
              if (data.code == 200) {
                self.$router.replace({path: '/account'})
                self.notice('success', 'success')
              }
            })
          }
        })
      },
      cancel() {
        let self = this;
        self.$router.replace({path: '/account'})
      }
    }
  }
</script>
<style scoped>
  .my-container {
    width: 500px
  }

  .passwordBtn {
    vertical-align: baseline;
  }
</style>
