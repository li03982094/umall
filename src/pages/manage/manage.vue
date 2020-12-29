<template>
  <div>
    <el-button class="cen" type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
import vAdd from "./components/add";
import vList from "./components/list";
import { userList, userCount } from "../../utils/http";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      list: [],
      info: {
        isShow: false,
        isadd: true,
      },
      total:0,
      pageSize:2,
      page:1
    };
  },
  methods: {
    willAdd() {
      this.info.isShow = true;
      this.info.isadd = true;
    },
    init() {
     this.getTotal()
     this.getList()
    },
    edit(id) {
      this.info.isShow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
    getTotal(){
      userCount().then(res=>{
        if(res.data.code==200){
          this.total=res.data.list[0].total
        }
      })   
    },
    getList(){
      userList({page:this.page,size:this.pageSize}).then(res=>{
        if(res.data.code==200){
          if(res.data.list.length==0&&this.page>1){
            this.page--
            this.getList()
            return
          }
          this.list=res.data.list
        }
      })
    },
    changePage(e){
      this.page=e
      this.getList()
    }

  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>