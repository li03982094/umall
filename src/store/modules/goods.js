let state={
    list:[]
}
let mutations={
    changeList(state,arr){
        state.state=arr
    }
}

let getters={
    list(state){
        return state.list
    }
}
let actions={
    reqList(context){
        // bool是true 就走全部
        
        speList().then(res=>{
            if(res.data.code==200){
                // 删除最后一条的bug
                // if(res.data.list.length==0&&context.state.page>0){
                //     context.commit("changePage",context.state.page-1)
                //     context.dispatch("reqList")
                //     return
                // }

                let list =res.data.list
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                }) 
                context.commit("changeList",list)
            }
        })
    },
}

export default{
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}