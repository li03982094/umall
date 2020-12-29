import axios from "axios"
import qs from "qs"
import Vue from "vue"

import { erralert } from "./alert"
// 开发环境8080
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

// 生产环境用 打包
// let baseUrl =""
// Vue.prototype.$pre=""

// 响应拦截
axios.interceptors.response.use(res => {
    if (res.data.code !== 200) {
        erralert(res.data.msg)
    }
    if (!res.data.list) {
        res.data.list = []
    }
    console.group("请求地址：" + res.config.url)
    console.log(res)
    console.groupEnd()
    return res
})

// post带文件参数要转换
function formData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

// ------菜单管理------

// 菜单列表
export let menuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }
    })
}
// 菜单添加
export const menuAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 菜单获取一条
export let menuInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: obj
    })
}
// 菜单删除
export let menuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 菜单修改
export let menuEdit = (obj) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(obj)
    })
}
// -----角色管理-------
//角色添加
export let roleAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 角色列表
export let roleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
    })
}
// 获取一条角色列表
export let roleInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        params: obj
    })
}
// 角色修改
export let roleEdit = (obj) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: obj
    })
}
// 角色删除
export let roleDel = (obj) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: obj
    })
}

// ----管理员管理------
// 管理员添加
export let userAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(obj)
    })
}
//管理员总数（用于计算分页）
export let userCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",
    })
}
//管理员列表（分页）
export let userList = (obj) => {
    return axios({
        url: baseUrl + "/api/userlist",
        params: obj
    })
}
//管理员获取（一条）
export let userInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        params: obj
    })
}
// 管理员修改
export let userEdit = (obj) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(obj)
    })
}
//管理员删除
export let userDel = (obj) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify(obj)
    })
}
// 管理员登录
export let userLogin = (obj) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data: qs.stringify(obj)
    })
}

// --商品分类--

// 商品分类添加
export let cateAdd = (obj) => {
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data: formData(obj)
    })
}
//商品分类列表
// istree是否需要返回树形结构  是-true,    {pid:1} 
export let cateList = (obj) => {
    return axios({
        url: baseUrl + "/api/catelist",
        params: obj
    })
}
//商品分类获取（一条）
export let cateInfo = (obj) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        params: obj
    })
}
// 商品分类修改
export let cateEdit = (obj) => {
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: formData(obj)
    })
}
//商品分类删除
export let cateDel = (obj) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

//---轮播图---
// 轮播图添加 title img status
export let bannerAdd=(obj)=>{
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:formData(obj)
    })
}
//轮播图列表
export let bannerList=()=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get"
    })
}
//轮播图获取 一条  id
export let bannerInfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:obj
    })
}
//轮播图修改 id title img status
export let bannerEdit=(obj)=>{
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:formData(obj)
    })
}
//轮播图删除
export let bannerDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}


//会员管理
// 会员列表
export let memberList=()=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get"
    })
}
//会员获取 一条 uid
export let memberInfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/memberinfo",
        method:"get",
        params:obj
    })
}
// 会员修改 uid nickname phone password
export let memberEdit=(obj)=>{
    return axios({
        url:baseUrl+"/api/memberedit",
        method:"post",
        data:qs.stringify(obj)
    })
}

// 商品规格 specsname attrs status
export let speAdd=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(obj)
    })
}
//商品规格总数 用于计算分页
export let speCount=()=>{
    return axios({
        url:baseUrl+"/api/specscount"
    })
}
//商品规格列表 （分页） size page 没有传参数（page size）,那么会取到所有的规格
export let speList=(obj)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"get",
        params:obj
    })
}
//商品规格获取 一条 id
export let speInfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:obj
    })
}
//商品规格修改 id specsname attrs status
export let speEdit=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:qs.stringify(obj)
    })
}
//商品规格删除 id
export let speDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}

// ---商品--- 
// 商品添加
export let goodsAdd=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsadd",
        method:"post",
        data:formData(obj)
    })
}
//商品总数 用于计算分页
export let goodsCount=()=>{
    return axios({
        url:baseUrl+"/api/goodscount"
    })
}
//商品列表 （分页） size page fid sid
export let goodsList=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodslist",
        method:"get",
        params:obj
    })
}
//商品获取 一条 id
export let goodsInfo=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsinfo",
        method:"get",
        params:obj
    })
}
//商品修改 
export let goodsEdit=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsedit",
        method:"post",
        data:formData(obj)
    })
}
//商品删除 id
export let goodsDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/goodsdelete",
        method:"post",
        data:qs.stringify(obj)
    })
}
