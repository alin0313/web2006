import axios from "axios"
import base from "./base"

const api = {
    //登录接口
    getLogin(params){
        return axios.post(base.baseUrl + base.login,params)
    },
    //注册接口
    getRegister(params){
        return axios.post(base.baseUrl + base.register,params)
    },
    //商品查询接口(get)
    getSelectTbItemAllByPage(params){
        return axios.get(base.baseUrl + base.selectTbItemAllByPage,{params})
    },
    //分页
    getTotal(){
        return axios.get(base.baseUrl + base.total)
    },
    //模糊查询
    getSearch(params){
        return axios.get(base.baseUrl + base.search,{params})
    },
    //类目选择
    selectItemCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectItemCategoryByParentId,{params})
    },
    //产品添加
    insertTbItem(params){
        return axios.get(base.baseUrl + base.insertTbItem,{params})
    },
    //产品删除
    deleteItemById(params){
        return axios.get(base.baseUrl + base.deleteItemById,{params})
    },
    //预更新
    preUpdateItem(params){
        return axios.get(base.baseUrl + base.preUpdateItem,{params})
    },
    //修改
    updateTbItem(params){
        return axios.get(base.baseUrl + base.updateTbItem,{params})
    },
    //单一类目选择
    preCategory(params){
        return axios.get(base.baseUrl + base.preCategory,{params})
    },


    //规格参数的读取数据
    selectItemParamAll(params){
        return axios.get(base.baseUrl + base.selectItemParamAll,{params})
    },
    //规格参数的查询
    paramsSearch(params){
        return axios.get(base.baseUrl + base.paramsSearch,{params})
    },
    //规格参数的删除
    paramsDelete(params){
        return axios.get(base.baseUrl + base.paramsDelete,{params})
    },
    //规格参数的分页
    paramsTotal(params){
        return axios.get(base.baseUrl + base.paramsTotal,{params})
    },
    //规格参数的添加
    insertItemParam(params){
        return axios.get(base.baseUrl + base.insertItemParam,{params})
    },
    //规格参数添加到数据
    paramsItem(params){
        return axios.get(base.baseUrl + base.paramsItem,{params})
    },


    //内容分类管理 查询导航
    selectContentCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectContentCategoryByParentId,{params})
    },
    //内容分类管理 增加子导航
    insertContentCategory(params){
        return axios.get(base.baseUrl + base.insertContentCategory,{params})
    },
    //内容分类管理 修改子导航
    updateContentCategory(params){
        return axios.get(base.baseUrl + base.updateContentCategory,{params})
    },
    //内容分类管理 删除子导航
    deleteContentCategoryById(params){
        return axios.get(base.baseUrl + base.deleteContentCategoryById,{params})
    },
    //内容分类管理 内容增加
    insertTbContent(params){
        return axios.get(base.baseUrl + base.insertTbContent,{params})
    },
    //内容分类管理 内容删除
    deleteContentByIds(params){
        return axios.get(base.baseUrl + base.deleteContentByIds,{params})
    },
     //内容分类管理 内容查询
     selectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId,{params})
    },
}
export default api