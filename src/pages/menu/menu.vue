<template>
  <div>
    <!-- 添加框 -->
    <el-button class="cen" type="primary" @click="willAdd"
       >添加</el-button
    >
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
    <!-- 数据 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vList from "./components/vList.vue"
import vAdd from "./components/vAdd.vue"
import {menuList} from  "../../utils/http"

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
          isAdd:true
        }
      }
  },
  methods:{
    willAdd(){
      this.info.isShow=true
      this.info.isAdd=true
    },
    init(){
      menuList().then(res=>{
        if(res.data.code==200){
          this.list=res.data.list
         
        }     
      })
    },
    edit(id){
      this.info.isShow=true;
      this.info.isAdd=false;
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