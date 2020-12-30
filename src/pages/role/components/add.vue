<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色职位" label-width="100px">
          <el-tree
            :data="dataList"
            show-checkbox
            default-expand-all
            ref="tree"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :default-checked-keys="JSON.parse(user.menus)"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleAdd, roleInfo, roleEdit, menuList } from "../../../utils/http";
import { sucalert, erralert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["list", "info"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
      dataList: "",
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  mounted() {
    menuList().then((res) => {
      if (res.data.code == 200) {
        this.dataList = res.data.list;
      }
    });
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    verification() {
      return new Promise((resolve, reject) => {
        if (this.user.rolename == "") {
          erralert("角色名称不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.verification().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
          }
          this.cancel();
          this.empty();
          this.$emit("init");
        });
      });
    },

    empty() {
      this.user = {
        rolename: "",
        menus: "[]",
        status: 1,
      };
    },
    cancel() {
      this.$refs.tree.setCheckedKeys([], true);
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isShow = false;
    },
    getOne(id) {
      roleInfo({ id: id }).then((res) => {
        this.user = res.data.list;
        this.user.id = id;
        console.log(res);
      });
    },
    update() {
      this.verification().then(() => {
        this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        roleEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
            // 修改的是自己就退出登录
            if (this.user.id == this.userInfo.roleid) {
              this.changeUser({}), this.$router.push("/login");
              return;
            }
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