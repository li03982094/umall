<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题" width="180"> </el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { bannerDel } from "../../../utils/http";
import { sucalert } from "../../../utils/alert";
export default {
  props: ["list"],
  methods: {
    del(id) {
      bannerDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          sucalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    edit(id){
        this.$emit("edit",id)
    }
  },
};
</script>

<style scoped>
img {
  width: 70px;
  height: 70px;
}
</style>