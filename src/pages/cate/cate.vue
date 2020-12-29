<template>
  <div>
    <el-button class="cen" type="primary" @click="willAdd">添加</el-button>

    <v-add :info="info"  ref="add"></v-add>
    <v-list   @edit="edit($event)"></v-list>
  </div>
</template>

<script>

import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      list: [],
      info: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  methods: {
    
    willAdd() {
      this.info.isShow = true;
      this.info.isAdd = true;
    },
    edit(id){
      this.info.isShow = true;
      this.info.isAdd = false;
      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    
  },
};
</script>

<style>
</style>