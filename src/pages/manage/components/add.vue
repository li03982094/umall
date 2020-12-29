<template>
  <div>
    <el-dialog
      :title="info.isadd ? '管理员添加' : '管理员编辑'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid" >
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in dataList"
              :key="item.id"
              :value="item.id"
              :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="user.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        
        <el-button type="primary"  v-if="info.isadd" @click="add">添 加</el-button>
        <el-button type="primary"  v-else @click="update">修 改</el-button>
      </div>  

    </el-dialog>
  </div>
</template>

<script>
import {roleList,userAdd,userInfo,userEdit} from "../../../utils/http";
import { sucalert } from "../../../utils/alert";
export default {
  props: ["list", "info"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      dataList: "",
    };
  },
  mounted() {
    roleList().then((res) => {
      if (res.data.code == 200) {
        this.dataList = res.data.list;
      }
    });
  },
  methods: {
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isShow = false;
    },
    add(){
      userAdd(this.user).then(res=>{
        if(res.data.code==200){
          sucalert(res.data.msg)
        }
        this.cancel()
        this.empty()
        this.$emit("init")
      })
    },
    getOne(id){
      userInfo({uid:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
        }
        this.user.password=""
      })
    },
    update(){
      userEdit(this.user).then(res=>{
          if(res.data.code==200){
            sucalert(res.data.msg)
            this.cancel()
            this.empty()
            this.$emit("init")
          }
      })
    }
  },
};
</script>

<style>
</style>