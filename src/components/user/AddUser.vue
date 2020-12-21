<template>
  <div>
    <el-row>
      <div class="userHeader">
        <span>新增用户</span>
      </div>
    </el-row>
    <el-col :span="5">
      <div class="aside">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="19">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-page-header @back="goBack" content="基础信息">
          </el-page-header>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入邮箱地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="密码" prop="password">
                <el-input :type="pwdType" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                <img :src="openeye" class="eye" alt="" @click="changeType">
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="1">
              <el-form-item label="确认密码" prop="repassword">
                <el-input :type="pwdType1" v-model="ruleForm.repassword" placeholder="请输入确认密码"></el-input>
                <img :src="openeye1" class="eye" alt="" @click="changeImg">
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm')">创建</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

    </el-col>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                pwdType: 'password',
                pwdType1: 'password',
                openeye: require('@/assets/beye.png'),
                openeye1: require('@/assets/beye1.png'),

                ruleForm: {
                    name: '',
                    email: '',
                    password: '',
                    repassword: '',
                    phone: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'change'},
                        {min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur'}
                    ],
                    repassword: [
                        {required: true, message: '请输入确认密码', trigger: 'change'},
                        {min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: false, message: '请输入邮箱地址', trigger: 'change'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: 'change'},
                    ],
                }
            }
        },
        methods: {
            changeType() {
                this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
                this.openeye = this.openeye == require("@/assets/beye.png") ? require("@/assets/eye.png") : require("@/assets/beye.png");
            },
            changeImg() {
                this.pwdType1 = this.pwdType1 === 'password' ? 'text' : 'password';
                this.openeye1 = this.openeye1 == require("@/assets/beye1.png") ? require("@/assets/eye1.png") : require("@/assets/beye1.png");
            },
            goBack() {
                window.history.back();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.ruleForm);
                        this.$http.post('/user/add', {
                            data: this.ruleForm
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.$router.push('/users')
                                this.$message.success({message: res.data.msg})
                            } else {
                                this.$message.error({
                                    message: res.data.msg
                                })
                            }
                        }).catch(error=>{
                            this.$message.error({
                                message: '系统出现问题'+ error,
                            });
                        })
                    } else {
                        console.log('请输入必填信息');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
  .userHeader {
    margin-top: 40px;
    float: left;
    height: 60px;
    width: 1900px;
    line-height: 60px;
    font-size: 22px;
    color: black;
    background-color: rgba(165, 165, 165, 0.1);
  }

  .aside {
    border-width: 0px 30px;
    border-style: solid;
    border-color: rgba(165, 165, 165, 0.1);
    height: 793px;
  }

  span {
    margin-left: 400px;
  }


  .box-card {
    height: 791px;
  }


</style>
<style>
  .eye {
    position: absolute;
    top: 10px;
    width: 20px;
    right: 8px;
  }
</style>
