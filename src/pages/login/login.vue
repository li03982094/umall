<template>
  <div class="login">
      <div class="con">
        <h3 class="cen">登录</h3>
        <el-form :model="user" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="请输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input>
        </el-form-item>

        <div class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
       
      </el-form>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {userLogin} from "../../utils/http"
import {sucalert} from "../../utils/alert"
export default {
  data(){
    return {
      user:{
        username:"",
        password:""
      },
      rules:{
        username:[
          {required:true,message:"请输入账号",trigger: "blur"},
          {min:3,max:10,message:"长度在3到10个字符",trigger: "blur"}
        ],
        password:[
           { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    //登录
    login(){
      userLogin(this.user).then(res=>{
        if(res.data.code==200){
          sucalert(res.data.msg)
          this.changeUser(res.data.list)
          this.$router.push("/")
        }
      })
    }
  },
  mounted(){
    console.log(JSON.parse(sessionStorage.getItem("userInfo")))
  }
}
</script>

<style scoped>
.login{
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(to right,#553544,#433A52,#303D60);

}
.con{
  text-align: center;
  width: 400px;
  height: 250px;
  padding: 20px;
  margin: 0 auto;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%);
}
h3{
  color: rgb(5, 10, 9);
}
.cen{
  margin: 20px;
  

}
</style>