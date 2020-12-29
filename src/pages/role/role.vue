<template>
  <div>
     <el-button class="cen" type="primary" @click="willAdd"
       >添加</el-button
    >
      <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
      <v-list  :list="list" @init="init" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"
import {roleList} from "../../utils/http"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return{
      list:[],
      info:{
          isShow:false,
          isadd:true
        }
    }
  },
  methods:{
     willAdd(){
      this.info.isShow=true
      this.info.isadd=true
    },
    init(){
      roleList().then(res=>{
        if(res.data.code==200){
          this.list=res.data.list
        }     
      })
    },
     edit(id){
      this.info.isShow=true;
      this.info.isadd=false;
      this.$refs.add.getOne(id)
  
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style>

</style>