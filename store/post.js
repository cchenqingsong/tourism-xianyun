export const state = () => {
    return {
        // 草稿箱数据
        draft:[]
    }
}


export const mutations = {
    // 添加本地草稿箱
    setDraft(state,data){
        state.draft.unshift(data)
    },
    // 删除当前草稿箱的某一项
    delDraft(state,data){
        state.draft.splice(data,1)
    }
}