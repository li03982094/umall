import {goodsList,goodsCount} from "../../utils/http"
let state={
    list:[],
    total:0,
    //一页的数量
    size:2,
    //当前的页码
    page:1
}
let mutations={
    changeList(state,arr){
        state.list=arr
    },
    changeTotal(state,num){
        state.total=num
    },
    changePage(state,num){
        state.page=num
    }
}

let getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    page(state){
      return  state.page
    },
    size(state){
        return state.size
    }
}
let actions={
    reqList(context,bool){
        // bool是true 就走全部
        let params=bool?{}:{page:context.state.page,size:context.state.size}
        goodsList(params).then(res=>{
            if(res.data.code==200){
                // 删除最后一条的bug
                if(res.data.list.length==0&&context.state.page>0){
                    context.commit("changePage",context.state.page-1)
                    context.dispatch("reqList")
                    return
                }

                
                context.commit("changeList",res.data.list)
            }
        })
    },
    reqTotal(context){
       goodsCount().then(res=>{
            if(res.data.code==200){
                context.commit("changeTotal",res.data.list[0].total)
            }
        })
    },
    //修改page
    changePage(context,num){
        //修改页码
        context.commit("changePage",num)
        //重新请求list
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