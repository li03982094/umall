<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-add :info="info" ref="add"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vAdd from "./components/add"
import vList from "./components/list"
export default {
  components:{
    vAdd,
    vList
  },
  data() {
    return {
      info:{
        isAdd:true,
        isShow:false
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
    }),
    willAdd(){
      this.info.isAdd=true,
      this.info.isShow=true
    },
    edit(id){
      this.info.isAdd=false
      this.info.isShow=true
      this.$refs.add.getOne(id)
    }
  },
  mounted() {},
};
</script>

<style scoped>
</style>