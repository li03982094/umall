<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isShow"
      @closed="cancel"
      @opened="opened"
    >
      <el-form :model="user">
        
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstList">
            <el-option label="--请选择--" disabled value=""> </el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="inpf">
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <div>+</div>
            <input v-if="info.isShow" @change="changeImg" type="file" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpe">
            <el-option label="--请选择--" disabled value> </el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option label="--请选择--" disabled value=""> </el-option>
            <el-option
              v-for="item in shspecsAttr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <!-- 富文本编辑器 -->
          <div id="editor" v-if="info.isShow"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
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
import { cateList, goodsAdd, goodsInfo, goodsEdit } from "../../../utils/http";
import { sucalert, erralert } from "../../../utils/alert";
import E from "wangeditor";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      secondCateList: [],
      // 规格属性展示的列表
      shspecsAttr: [],
    };
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqcateList: "cate/reqList",
      reqspecsList: "specs/reqList",
      reqTotal: "goods/reqTotal",
    }),
    cancel() {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.info.isShow = false;
    },
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      this.secondCateList = [];
      // 规格属性展示的列表
      this.shspecsAttr = [];
    },
    changeFirstList() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      cateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSpe() {
      this.user.specsattr = [];
      this.getSecondSpe();
    },
    getSecondSpe() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      console.log(obj);
      this.shspecsAttr = obj ? obj.attrs : [];
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
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
    verification() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid == "") {
          erralert("一级列表不能为空");
          return;
        }
        if (this.user.second_cateid == "") {
          erralert("二级列表不能为空");
          return;
        }
        if (this.user.goodsname == "") {
          erralert("商品名称不能为空");
          return;
        }
        if (this.user.price === "") {
          erralert("商品价格不能为空");
          return;
        }
        if (this.user.market_price === "") {
          erralert("商品市场价格不能为空");
          return;
        }
        if (!this.user.img) {
          erralert("请上传图片图片");
          return;
        }
        if (this.user.specsid === "") {
          erralert("商品规格不能为空");
          return;
        }
        if (this.user.specsattr.length === 0) {
          erralert("请选择规格属性");
          return;
        }
        if (this.editor.txt.html() == "") {
          erralert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    add() {
      this.verification().then(() => {
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        goodsAdd(data).then((res) => {
          if (res.data.code == 200) {
            sucalert(res.data.msg);
            this.cancel();
            this.empty();
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },
    getOne(id) {
      console.log(id);
      goodsInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.getSecondList();
          this.imgUrl = this.$pre + this.user.img;
          this.getSecondSpe();
          this.user.specsattr = JSON.parse(this.user.specsattr);
          this.user.id = id;
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    update() {
      this.verification().then(() => {
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        goodsEdit(data).then((res) => {
          if (res.data.code == 200) {
            this.cancel();
            this.empty();
            sucalert(res.data.msg);
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqcateList();
    }
    this.reqspecsList(true);
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