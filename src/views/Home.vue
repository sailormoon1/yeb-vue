<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">云E办</div>
      <el-dropdown class="userInfo" @command="handleCommand">
        <span class="el-dropdown-link">
          {{user.name}}<i><img :src="user.userFace"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router unique-opened>
          <el-submenu :index="index+''" v-for="(item,index) in routes" :key="index" v-if="!item.flag">
            <template slot="title"><i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item :index="children.path" v-for="(children,indexj) in item.children" :key="indexj">
              {{ children.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
          欢迎来到云E办系统！
        </div>
        <router-view class="homeRouterView"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  computed: {
    routes() {
      return this.$store.state.routes;
    }
  }
  ,
  methods:{
    handleCommand(command){
      if(command=='logout'){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //注销登录
          this.postRequest('/logout');
          window.sessionStorage.removeItem('tokenStr');
          window.sessionStorage.removeItem('user');
          this.$store.commit('initRoutes',[]);
          this.$router.replace('/');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销登录'
          });
        });

      }
    }
  }
}
</script>

<style>
.homeHeader {
  background: #42b983;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 华文楷体;
  color: white;
}
.homeHeader.userInfo{
  cursor: pointer;
}
.el-dropdown-link img{
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-left: 8px;
}
.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文楷体;
  color: darkturquoise;
  padding-top: 58px;
}
.homeRouterView{
  margin-top: 10px;

}
</style>