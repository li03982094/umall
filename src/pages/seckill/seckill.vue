<template>
  <div>
      <el-button type="primary"  @click="willAdd">添加</el-button>
      <v-add :info="info" ref="add"></v-add>
      <v-list @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import vAdd from "./components/add"
import vList from "./components/list"
import {mapGetters,mapActions} from "vuex"
export default {
  components:{
    vAdd,
    vList
  },
  computed:{
    ...mapGetters({
      list:"seck/list"
    })
  },
  data(){
    return{
      info:{
        isAdd:true,
        isShow:false
      }
    }
  },
  methods:{
    ...mapActions({
      reqList:"seck/reqList"
    }),
    willAdd(){
      this.info.isAdd=true
      this.info.isShow=true
    },
    edit(id){
      this.info.isAdd=false
      this.info.isShow=true
      this.$refs.add.getOne(id)

    }
  }
}
</script>

<style>

</style>