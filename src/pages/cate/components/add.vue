<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
      {{ user }}
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" clearable></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px" v-if="user.pid !== 0">
          <div class="inpf">
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <div>+</div>
            <input v-if="info.isShow" @change="changeImg" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cateList, cateAdd, cateInfo, cateEdit } from "../../../utils/http";
import path from "path";
import { erralert, sucalert } from "../../../utils/alert";
import {mapGetters,mapActions} from "vuex"
export default {
  props: ["info"],
  computed:{
    ...mapGetters({
      list:"cate/list"
    })
  },
  data() {
    return {
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  methods: {
    ...mapActions({
      "reqList":"cate/reqList"
    }),
    empty() {
      this.imgUrl = "";
      //3.初始化user
      this.user = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
    },
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.isShow = false;
    },
    changeImg(e) {
      console.log(e);
      let file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        erralert("文件大小不能超过2M");
        return;
      }

      let extname = path.extname(file.name);
      let arr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erralert("请上传正确的图片格式");
        return;
      }
      // 文件生成一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    add() {
      console.log("123")
      cateAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          sucalert(res.data.msg);
        }
        this.cancel();
        this.empty();
        this.reqList()
      });
    },
    getOne(id) {
      cateInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update() {
      cateEdit(this.user).then((res) => {
        if (res.data.code == 200) {
          sucalert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqList()
        }
      });
    },
  },
};
</script>

<style scoped>
.inpf {
  width: 100px;
  height: 100px;
  border: 1px dashed #666;
  position: relative;
}
.inpf div {
  width: 100px;
  height: 100px;
  line-height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  font-size: 35px;
}
.inpf img {
  width: 100px;
  height: 100px;
}
.inpf input {
  position: absolute;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
  opacity: 0;
}
</style>