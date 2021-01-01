<template>
  <div>
    <el-table
      :data="list"
      border
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="title" label="活动名称" width="180">
      </el-table-column>

      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { sucalert } from "../../../utils/alert";
import { seckDel } from "../../../utils/http";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "seck/reqList",
    }),
    del(id) {
      seckDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          sucalert(res.data.msg);
        }
        this.reqList();
      });
    },
    edit(id){
        this.$emit("edit",id)
    }
  },
  mounted() {
    this.reqList();
  },
};
</script>

  <style scoped>
</style>