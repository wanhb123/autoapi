<template>
  <div>
    <el-row>
      <div class="userHeader">
        <span>编辑项目</span>
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
          <el-page-header @back="goBack" content="编辑项目信息">
          </el-page-header>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item>
                <el-button type="primary" @click="cancel">取消</el-button>
                <el-button type="success" @click="submitForm('ruleForm')">确定</el-button>
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
                ruleForm: {
                    name: '',
                },

                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            goBack() {
                window.history.back();
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post('/project/updateProject', {
                            name: this.ruleForm.name,
                            id: this.$route.query.id
                        }).then(res=>{
                            if (res.data.code==200){
                                this.$router.push('/projects')
                                this.$message.success({message: res.data.msg})
                            }else {
                                this.$message.error({
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        console.log('请输入正确的信息');
                        return false;
                    }
                });
            },
            cancel() {
                window.history.back();
            },
            handle(id){

                this.$http.post('/project/getProject', {id: id}).then(res=>{
                    this.ruleForm.name = res.data.projectname;
                })
            },
        },
        created() {
            this.handle(this.$route.query.id);
        },
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
