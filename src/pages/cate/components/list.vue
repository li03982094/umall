<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <el-table-column label="图片" sortable width="180">
        <template slot-scope="scope">
          <img
            v-if="scope.row.img !== 'null'"
            :src="$pre + scope.row.img"
            alt=""
          />
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope" >
          <el-button type="primary" v-if="scope.row.status == 1"
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
import { cateDel } from "../../../utils/http";
import { sucalert } from "../../../utils/alert";
import {mapGetters,mapActions} from "vuex"
export default {
  computed:{
    ...mapGetters({
      "list":"cate/list"
    })
  },
  methods: {
    ...mapActions({
      "reqList":"cate/reqList"
    })
    ,del(id) {
      cateDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          sucalert(res.data.msg);
          this.reqList()
        }
      }); 
    },
    edit(id) {
      this.$emit("edit", id);
    },
  },
  mounted(){
    this.reqList();
  }
};
</script>

<style scoped>
img {
  width: 70px;
  height: 70px;
}
</style>