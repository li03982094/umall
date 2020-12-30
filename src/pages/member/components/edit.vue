<template>
  <div>
    <el-dialog title="会员编辑" :visible.sync="info.isShow" @closed="cancel">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" show-password></el-input>
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
        <el-button
          type="primary"
          @click="update"
          :disabled="user.password == ''"
          >修 改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { memberEdit, memberInfo, userAdd } from "../../../utils/http";
import { sucalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  mounted() {},
  methods: {
    empty() {
      this.user = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };
    },
    cancel() {
      this.info.isShow = false;
    },
    verification() {
      return new Promise((resolve, reject) => {
        if (this.user.phone == "") {
          erralert("请输入手机号");
          return;
        }
        if (this.user.nickname == "") {
          erralert("请输入昵称");
          return;
        }
        if (this.user.password == "") {
          erralert("请输入密码");
          return;
        }
        resolve();
      });
    },
    getOne(uid) {
      memberInfo({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.uid = uid;
        }
      });
    },
    update() {
      this.verification().then(() => {
        memberEdit(this.user).then((res) => {
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