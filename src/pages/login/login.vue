<template>
  <div class="login">
      <div class="con">
        <h3 class="cen">登录</h3>
        <el-input class="cen" placeholder="请输入用户名" v-model="user.name" clearable></el-input>
        <el-input class="cen" placeholder="请输入密码" v-model="user.pass" show-password></el-input>
        <el-button class="cen" type="primary" plain @click="login">登录</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{
        name:"",
        pass:""
      }
    }
  },
  methods:{
    //登录
    login(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right,#553544,#433A52,#303D60);
}
.con{
  text-align: center;
  width: 400px;
  margin: 0 auto;
  padding-top: 100px;
}
h3{
  color: aquamarine;
}
.cen{
  margin: 10px;
}
</style>