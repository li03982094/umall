<template>
  <div>
      <el-button class="cen" type="primary" @click="willAdd">添加</el-button>
      <v-add  :info="info" :list="list" @init="init" ref="add"></v-add>
      <v-list  :list="list" @init="init" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"
import {bannerList} from "../../utils/http"
export default {
  components:{
    vAdd,
    vList
  },
  data(){
    return{
      info:{
        isShow:false,
        isAdd:true
      },
      list:[]
    }
  },
  methods:{
    init(){
      bannerList().then(res=>{
        if(res.data.code==200){
          this.list=res.data.list
        }
      })
    },
    willAdd(){
      this.info.isAdd=true
      this.info.isShow=true
    },
    edit(id){
      this.info.isAdd=false
      this.info.isShow=true
      this.$refs.add.getOne(id)
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style >

</style>