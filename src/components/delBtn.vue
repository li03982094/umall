<template>
  <el-button type="danger" @click="del">删除</el-button>
</template>

<script>
export default {
  methods: {
    del() {
      this.$confirm("您确定要删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
            this.$emit("confirm")
        })
        .catch();
    },
  },
};
</script>

<style>
</style>