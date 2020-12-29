import { speList,speCount} from "../../utils/http"

let state ={
    list:[],
    size:2,
    page:1,
    total:0
}
let mutations={
    changeList(state,arr){
       state.list=arr
    },
    changePage(state,num){
        state.page=num
    },
    changeTotal(state,num){
        state.total=num
    }
}   
let getters={
    list(state){
        return state.list
    },
    page(state){
        return state.page
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    }
}

let actions={
    reqList(context,bool){
        // bool是true 就走全部
        let params=bool?{}:{page:context.state.page,size:context.state.size}
        speList(params).then(res=>{
            if(res.data.code==200){
                // 删除最后一条的bug
                if(res.data.list.length==0&&context.state.page>0){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqList")
                    return
                }

                let list =res.data.list
                list.forEach(item=>{
                    item.attrs=JSON.parse(item.attrs)
                }) 
                context.commit("changeList",list)
            }
        })
    },
    reqTotal(context){
        speCount().then(res=>{
            if(res.data.code==200){
                context.commit("changeTotal",res.data.list[0].total)
            }
        })
    },
    changePage(context,num){
        context.commit("changePage",num)
        context.dispatch("reqList")
    }
}

export default{
    state,
    mutations,
    getters,
    actions,
    namespaced:true
}