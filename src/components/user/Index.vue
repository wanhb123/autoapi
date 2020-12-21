<template>
  <div class="app-nav">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#000000"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1" class="project_name">接口自动化平台</el-menu-item>
          <el-submenu index="2" class="system">
            <template slot="title">系统管理</template>
            <el-menu-item index="2-1">帐号管理</el-menu-item>
            <el-menu-item index="2-2">权限设置</el-menu-item>
          </el-submenu>
          <el-submenu index="3" class="user">
            <template slot="title">用户管理</template>
            <el-menu-item index="3-1" @click.native="goto">用户列表</el-menu-item>
            <el-menu-item index="3-2" @click="add">新增用户</el-menu-item>
          </el-submenu>
          <el-submenu index="4" class="interface">
            <template slot="title">项目管理</template>
            <el-menu-item index="4-1" @click.native="getProjects">项目列表</el-menu-item>
            <el-menu-item index="4-2">新增项目</el-menu-item>
          </el-submenu>
          <el-submenu index="5" class="project">
            <template slot="title">接口管理</template>
            <el-menu-item index="5-1" @click.native="getInterface">接口列表</el-menu-item>
            <el-menu-item index="5-2">新增接口</el-menu-item>
          </el-submenu>
          <el-submenu index="6" class="testcase">
            <template slot="title">用例管理</template>
            <el-menu-item index="6-1">用例列表</el-menu-item>
            <el-menu-item index="6-2">新增用例</el-menu-item>
          </el-submenu>
          <el-submenu index="7" class="testreport">
            <template slot="title">测试报告</template>
            <el-menu-item index="7-1">接口列表</el-menu-item>
            <el-menu-item index="7-2">新增接口</el-menu-item>
          </el-submenu>
          <div style="float: right">
            <el-dropdown class="dropdown">
              <span class="el-dropdown-link">
                {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu>
      </el-header>
    </el-container>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                username: localStorage.getItem('username'),
                activeIndex: '1',
                page: 1,
                size: 10,
                total: 25,
                tableData: [],
                formInline: {
                    search: ''
                },
            }
        },

        methods: {
            getProjects() {
                this.$router.push('/projects')
            },
            getInterface() {
                this.$router.push('/interfaces')
            },
            logout() {
                localStorage.clear()
                this.$router.push('/login')
            },
            add() {
              this.$router.push('/add')
            },
            goto() {
                this.$router.push('/users');
            },
            handleSizeChange(size) {
                this.size = size
                this.findByPage(this.page, size)
                console.log(this.size) //每页下拉显示数据
                console.log(this.page)
            },
            handleCurrentChange(page) {
                this.page = page
                this.findByPage(page, this.size)
                console.log(this.page)
            },
            handleSelect(key, keyPath) {
            },
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            handleEdit(index, row) {
            },
            handleDelete(index, row) {
            },
            indexMethod(index) {
                return (this.page - 1) * this.size + (index + 1);
            },

            findByPage(curPage, size, keyword) {
                this.$http.post('/users', {'page': curPage, 'size': size, 'search': keyword}).then(res => {
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
  .el-header {
    padding: 0px;
    margin: 0px;
  }

  .system, .interface, .user, .testcase, .testreport, .project {
    width: 150px;
    text-align: center;
  }

  .dropdown {
    font-size: 18px;
    color: white;
    margin: 16px 16px;
  }

  .project_name {
    width: 250px;
    margin: 0px;
    font-size: 18px;
    text-align: center;
  }

  .el-menu-item {
    text-align: center;
  }

  .el-header {
    width: 1900px;
  }

  .el-main {
    padding: 0px;
    margin: 0px;
  }

</style>
