<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '规格添加' : '规格编辑'"
      :visible.sync="info.isShow"
      @closed="cancel"
    >
      <div>
        {{ user }}
      </div>
      <div>
        {{ attrsArr }}
      </div>
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item, index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="input" v-model="item.value"></el-input>
            <el-button
              class="btn"
              type="primary"
              v-if="index == 0"
              @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button class="btn" type="danger" v-else @click="delAttr(index)"
              >删除</el-button
            >
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
import { mapActions, mapGetters } from "vuex";
import {speAdd,speEdit,speInfo} from "../../../utils/http"
import {sucalert} from "../../../utils/alert"
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal:"specs/reqTotal"
    }),
    cancel() {
        if(!this.info.isAdd){
            this.empty()
        }
        this.info.isShow=false
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    addAttr(){
        this.attrsArr.push({value:""})
    },
    delAttr(index){
        this.attrsArr.splice(index,1)
    },
    add() {
       this.user.attrs= JSON.stringify(this.attrsArr.map(item=>item.value))
        speAdd(this.user).then(res=>{
            if(res.data.code==200){
                sucalert(res.data.msg)
            }
            this.cancel()
            this.empty()
            this.reqList()
            this.reqTotal()
        })
    },
    getOne(id){
        speInfo({id:id}).then(res=>{
            if(res.data.code==200){
               this.user=res.data.list[0]
               this.user.attrs=JSON.parse(this.user.attrs)
               this.attrsArr=this.user.attrs.map(item=>({value:item}))
            }
        })
    },
    update() {
        this.user.attrs= JSON.stringify(this.attrsArr.map(item=>item.value))
        speEdit(this.user).then(res=>{
            if(res.data.code==200){
                sucalert(res.data.msg)
                this.cancel()
                this.empty()
                this.reqList()
            }
        })
    },
  },
  mounted() {},
};
</script>

<style scoped>
.line {
  display: flex;
}
.line .input {
  flex: 1;
}
.line .btn {
  width: auto;
}
</style>