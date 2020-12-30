<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
    
      <el-form :model="user" class="form">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { bannerAdd, bannerInfo, bannerEdit } from "../../../utils/http";
import { sucalert, erralert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  methods: {
    empty() {
      this.imgUrl = "";
      this.user = {
        title: "",
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
      let file = e.raw;
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    verification() {
      return new Promise((resolve, reject) => {
        if (this.user.title == "") {
          erralert("标题不能为空");
          return;
        }
        if (!this.user.img) {
          erralert("请上传图片");
          return;
        }
        resolve();
      });
    },

    add() {
      this.verification().then(() => {
        bannerAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
            this.empty();
            this.cancel();
            this.$emit("init");
          }
        });
      });
    },
    getOne(id) {
      bannerInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    update() {
      this.verification().then(() => {
        bannerEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
            this.cancel();
            this.empty();
            this.$emit("init");
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="stylus">
.form>>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>