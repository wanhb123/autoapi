<template>
  <div id="login">
    <el-row>
      <el-col :span="6" :offset="18">
        <div id="card">
          <el-card class="box-card">
            <h2 style="text-align: center">登录页面</h2>
            <el-divider></el-divider>
            <div id="form">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="phone">
                  <el-input v-model="ruleForm.phone" maxlength="11" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="success" size="medium" @click="submitForm('ruleForm')">登录</el-button>
                  <el-button type="primary" size="medium" @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    phone: '',
                    password: '',
                },
                rules: {
                    phone: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/user/login', {
                                phone: this.ruleForm.phone,
                                password: this.ruleForm.password,
                            }
                            , {emulateJSON: true}).then(res => {
                            if (res.data.code === 200) {
                                localStorage.setItem('username', res.data.username);
                                console.log(localStorage.getItem('username'));
                                this.$router.push('/index');
                                // this.$message.success({
                                //     showClose: true,
                                //     message: res.data.msg,
                                // });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.data.msg,
                                    type: 'error',
                                });
                            }
                        }).catch((error) => {
                            console.log(error);
                            this.$message({
                                showClose: true,
                                message: '请求失败!',
                                type: 'error'
                            })
                        })
                    }
                });
            },
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
</script>

<style scoped>
  #card {
    margin-top: 300px;
    margin-left: -700px;
    width: 450px;
  }

  #form {
    margin-top: 20px;
    margin-left: -30px;
  }

  #login {
    background-image: url("../../assets/1.jpg");
    background-color: lightgreen;
    width: 100%;
    height: 100%;
    position: fixed;
    margin-top: -10px;
    margin-left: -10px;
    background-size: 100% 100%;

  }

  .box-card {
    background-color: rgba(165, 165, 165, 0.1);
  }


</style>
