<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="菜单名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="100px">
          <el-select v-model="user.pid" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.title"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="100px">
          <el-radio :label="1" v-model="user.type" disabled>目录</el-radio>
          <el-radio :label="2" v-model="user.type" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          label-width="100px"
          v-if="user.type == 1"
        >
          <el-select v-model="user.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="100px" v-else>
          <el-select v-model="user.url">
            <el-option
              v-for="(item, index) in indexRoutes"
              :key="index"
              :value="'/' + item.path"
              :label="item.name + '-/' + item.path"
            ></el-option>
          </el-select>
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
      <div slot="footer" class="dialog-footer" >
        <el-button type="danger" @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sucalert, erralert } from "../../../utils/alert";
import { indexRoutes } from "../../../router/index";
import { menuAdd, menuInfo, menuEdit } from "../../../utils/http";
export default {
  props: ["info", "list"],
  data() {
    return {
      user: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-camera-solid",
        "el-icon-s-platform",
        "el-icon-s-order",
      ],
      indexRoutes,
    };
  },
  methods: {
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.isShow = false;
    },
    empty() {
      this.user = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    verification() {
      return new Promise((resolve, reject) => {
        if (this.user.title == "") {
          erralert("菜单名称不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.verification().then(() => {
        menuAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
          }
          this.cancel();
          this.empty();
          this.$emit("init");
        });
      });
    },
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    getOne(id) {
      menuInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
        }
      });
    },
    update() {
      this.verification().then(() => {
        menuEdit(this.user).then((res) => {
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

<style>
</style>