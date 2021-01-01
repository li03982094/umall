<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '活动添加' : '活动编辑'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
      <div>
        {{ user }}
        <div>{{ value1 }}</div>
      </div>

      <el-form :model="user">
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstList">
            <el-option label="--请选择分类--" disabled value=""> </el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeSecondList">
            <el-option label="--请选择分类--" disabled value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择商品--" disabled value=""></el-option>
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
import { mapActions, mapGetters } from "vuex";
import {
  cateList,
  goodsList,
  seckAdd,
  seckEdit,
  seckInfo,
} from "../../../utils/http";
import { sucalert, erralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      goodsList: [],
      value1: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "seck/list",
      cateList: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "seck/reqList",
      reqCateList: "cate/reqList",
    }),
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.isShow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      (this.secondCateList = []), (this.goodsList = []);
    },
    changeFirstList() {
      (this.user.second_cateid = ""), this.getSecondList();
    },
    getSecondList() {
      cateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSecondList() {
      (this.user.goodsid = ""),
        this.getGoods()
    },
    getGoods(){
      goodsList({
          fid: this.user.first_cateid,
          sid: this.user.second_cateid,
        }).then((res) => {
          if (res.data.code == 200) {
            this.goodsList = res.data.list;
          }
        });
    },
    verification() {
      return new Promise((resolve, reject) => {
        if (this.user.title == "") {
          erralert("活动名称不能为空");
          return;
        }
        if (this.user.begintime == "" || this.user.endtime == "") {
          erralert("请选择活动期限");
          return;
        }
        if (this.user.first_cateid == "") {
          erralert("请选择一级列表");
          return;
        }
        if (this.user.second_cateid == "") {
          erralert("请选择二级列表");
          return;
        }
        if (this.user.goodsid == "") {
          erralert("请选择商品");
          return;
        }
        resolve();
      });
    },
    add() {
      this.user.begintime = this.value1[0];
      this.user.endtime = this.value1[1];
      this.verification().then(() => {
        seckAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
          }
        });
      });
    },
    getOne(id) {
      this.empty();
      seckInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.id = id;
          this.getSecondList();
          this.getGoods();
          this.value1 = [
            parseFloat(this.user.begintime),
            parseFloat(this.user.endtime),
          ];
        }
      });
    },
    update() {
      this.user.begintime = this.value1[0];
      this.user.endtime = this.value1[1];
      this.verification().then(()=>{
        seckEdit(this.user).then(res=>{
          if (res.data.code == 200) {
            sucalert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
          }
        })
      })
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    console.log(this.info);
  },
};
</script>

<style scoped>
</style>