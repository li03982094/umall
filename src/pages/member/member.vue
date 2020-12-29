<template>
  <div>
    <v-edit ref="edit" @init="init"  :info="info"></v-edit>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
     
    >
      <el-table-column prop="uid" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180">
      </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >   
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {memberList} from "../../utils/http"
import {sucalert} from "../../utils/alert"
import vEdit from "./components/edit"
export default {
  components: {
    vEdit
  },
  data() {
    return {
      list:[],
      info:{
         isShow: false
      }
    };
  },
  methods:{
    init(){
      memberList().then(res=>{
        if(res.data.code==200){
          this.list=res.data.list
        }
      })
    },
    edit(uid){
      this.info.isShow=true
      console.log(uid)
      this.$refs.edit.getOne(uid)
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style>
</style>