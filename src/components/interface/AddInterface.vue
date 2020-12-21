<template>
  <div id="add">
    <el-row>
      <div class="userHeader">
        <span>新增接口</span>
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
              <el-form-item label="接口名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入接口名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="请求地址" prop="url">
                <el-input v-model="ruleForm.url" placeholder="请输入请求地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="8" :offset="1">
                <el-form-item label="所属项目" prop="project">
                  <el-select v-model="ruleForm.project" placeholder="请选择所属项目" class="project">
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" class="select_type">
                <el-form-item label="请求方式" prop="type">
                  <el-select v-model="ruleForm.type" placeholder="请选择请求方式" class="type">
                    <el-option
                      v-for="item in items"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="1">
              <el-form-item label="请求参数" prop="parames">
                <el-input v-model="ruleForm.parames" :rows="3" type="textarea" placeholder="请输入请求参数"
                          maxlength="200" class="textarea"></el-input>
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
                options: [],
                items: [
                    {
                        value: '1',
                        label: 'get',
                    },
                    {
                        value: '2',
                        label: 'post',
                    }],
                value: '',
                ruleForm: {
                    name: '',
                    parames: '',
                    url: '',
                    type: '',
                    project: '',
                },
                rules: {
                    project: [
                        {required: true, message: '请选择所属项目', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入接口名称', trigger: 'blur'},
                    ],
                    type: [
                        {required: true, message: '请选择请求方式', trigger: 'blur'},
                    ],
                    parames: [
                        {required: true, message: '请输入请求参数', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入接口地址', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData: function () {
                this.$http.post('/interface/queryProjects').then(res => {
                    if (res.data.code == 200) {
                        this.options = res.data.data;
                    } else {
                        console.log("请求失败");
                    }
                }).catch(error => {
                    console.log(error);
                })
            },
            goBack() {
                window.history.back();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let username = localStorage.getItem('username')
                        this.ruleForm.createperson = username;
                        this.$http.post('/interface/addinterface', {
                            data: this.ruleForm
                        }).then(res => {
                            if (res.data.code == 200) {
                                localStorage.getItem('username')
                                this.$router.push('/interfaces')
                                this.$message.success({message: res.data.msg})
                            } else {
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

  .el-select {
    width: 454px;
  }

  .textarea {
    width: 456px;
  }
  .el-input {
    width: 456px;
  }

  #add {
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .type {
    width: 180px;
  }
  .project {
    width: 180px;
  }

  .select_type {
    margin-left: -210px;
  }
</style>


