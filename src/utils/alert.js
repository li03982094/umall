import Vue from "vue"
let vm=new Vue()

export let sucalert=(msg)=>{
    vm.$message({
        showClose: true,
        message: msg,
        type: 'success'
    })
}
export let erralert=(msg)=>{
    vm.$message({
        showClose: true,
        message: msg,
        type: 'warning'
    })
}