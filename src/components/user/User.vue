<template>
  <div>
    <el-row>
      <div class="userHeader">
        <el-col :span="2" :offset="5">
          <span class="userList">用户列表</span>
        </el-col>
        <el-col :span="2" :offset="10">
          <el-button class="add_btn" type="primary" @click="add">新增</el-button>
        </el-col>
        <el-col :span="4">
          <el-input class="search_input" v-model="search" @keyup.enter.native="searchHandler" placeholder="请输入姓名进行搜索">
          </el-input>
          <el-button><img :src="imgUrl" class="search_btn" alt="" @click="searchHandler"></el-button>
        </el-col>
      </div>
    </el-row>
    <el-col :span="5">
      <div class="aside">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="userDetail">用户详情</span>
          </div>
          姓名：王云逸
          <br>
          <br>
          手机号码：19636948564
          <br>
          <br>
          邮箱：
          <br>
          <br>
          <br>
          <br>
          <br>
          <br>
        </el-card>

      </div>
    </el-col>
    <el-col :span="19">
      <el-row id="table">
        <el-table
          :data="tableData"
          :header-cell-style="{
                    'background-color': 'rgba(165, 165, 165, 0.2)',
                    'color': '#000000'
                  }"
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            width="200"
            :index="indexMethod" class="table">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="id"
            v-if="show"
            label="id"
            width="250">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            width="250">
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="创建时间"
            width="250"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="email"
            width="250"
            label="邮箱">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <template>
                <el-popconfirm
                  confirmButtonText='确定'
                  cancelButtonText='取消'
                  @onConfirm="handleDelete(scope.$index, scope.row)"
                  icon="el-icon-info"
                  iconColor="red"
                  title="确定要删除该用户吗？"
                >
                  <el-button size="mini"
                             type="danger" slot="reference">删除
                  </el-button>
                  "
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
    <el-col :span="6" :offset="6">
      <el-pagination
        background
        :hide-on-single-page="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :total='total'
        :page-sizes="[5, 10, 20, 40]"
        prev-text="上一页"
        next-text="下一页"
        layout="prev, pager, next, jumper">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                imgUrl: require('@/assets/search.png'),
                activeIndex1: '1',
                activeIndex2: '2',
                page: 1,
                size: 10,
                total: 0,
                tableData: [],
                search: '',
                show: false,
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.findByPage(this.search, this.page, this.size);
            })
        },
        methods: {
            add() {
                this.$router.push('/add')
            },
            handleSizeChange(size) {
                this.size = size
                this.findByPage(this.search, this.page, size)
                console.log(this.size) //每页下拉显示数据
                console.log(this.page)
            },
            handleCurrentChange(page) {
                this.page = page
                this.findByPage(this.search, page, this.size)
                console.log(this.page)
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleEdit(index, row) {
                // sessionStorage.setItem('id', row.id);
                this.$router.push({
                    path:'/edit',
                    query:{id: row.id}})
            },
            handleDelete(index, row) {
                this.$http.post('/user/delete', {id: row.id}).then(res => {
                    if (res.data.code) {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                    }
                    ;
                    this.findByPage(this.search, this.page, this.size)
                }).catch(error => {
                    this.$message({
                        message: '操作失败!',
                        type: 'error'
                    })
                });
            },
            indexMethod(index) {
                return (this.page - 1) * this.size + (index + 1);
            },
            searchHandler() {
                this.findByPage(this.search, this.page, this.size)
            },

            findByPage(keyword, curPage, size) {
                this.$http.post('user/users', {search: keyword, page: curPage, size: size}).then(res => {
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                }).catch(error => {
                    console.log('获取数据失败!');
                });
            }
        },
    }
</script>

<style scoped>
  .el-pagination {
    margin-top: -10px;
  }

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

  .userList {
    padding-left: 10px;
  }

  #table {
    border-color: rgba(165, 165, 165, 0.1);
    padding: 20px 50px;
    margin-bottom: 20px;
  }

  .aside {
    border-width: 0px 30px;
    border-style: solid;
    border-color: rgba(165, 165, 165, 0.1);
    height: 793px;
  }

  .userDetail {
    font-size: 22px;
  }

  .add_btn {
    margin-left: 50px;
  }

  .search_btn {
    position: absolute;
    width: 20px;
    top: 64px;
    right: 128px;
  }

</style>
<style>
  .search_input {
    width: 280px;
  }
</style>
