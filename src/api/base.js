const base = {
    baseUrl:"/api",
    //登录
    login:"/api/login",
    //注册
    register:"/api/register",
    //商品查询接口
    selectTbItemAllByPage:"/api/backend/item/selectTbItemAllByPage",
    //分页
    total:"/api/total",
    //模糊查询
    search:"/api/search",
    //类目选择
    selectItemCategoryByParentId:"/api/backend/itemCategory/selectItemCategoryByParentId",
    //产品添加
    insertTbItem:"/api/backend/item/insertTbItem",
    //产品删除
    deleteItemById:"/api/backend/item/deleteItemById",
    //预更新
    preUpdateItem:"/api/backend/item/preUpdateItem",
    //修改
    updateTbItem:"/api/backend/item/updateTbItem",
    //单一类目
    preCategory:"/api/preCategory",


    //规格参数
    selectItemParamAll:"/api/backend/itemParam/selectItemParamAll",
    //规格参数的查询
    paramsSearch:"/api/params/search",
    //规格参数的删除
    paramsDelete:"/api/params/delete",
    //规格参数的分页
    paramsTotal:"/api/params/total",
    //规格参数的添加
    insertItemParam:"/api/backend/itemParam/insertItemParam",
    //规格参数添加到数据
    paramsItem:"/api/product/parmas/paramsItem",


    //内容分类管理 查询导航
    selectContentCategoryByParentId:"/api/content/selectContentCategoryByParentId",
    //内容分类管理 增加子导航
    insertContentCategory:"/api/content/insertContentCategory",
    //内容分类管理 修改子导航
    updateContentCategory:"/api/content/updateContentCategory",
    //内容分类管理 删除子导航
    deleteContentCategoryById:"/api/content/deleteContentCategoryById",
    //内容分类管理 内容增加
    insertTbContent:"/api/content/insertTbContent",
    //内容分类管理 内容删除
    deleteContentByIds:"/api/content/deleteContentByIds",
    //内容分类管理 内容查询
    selectTbContentAllByCategoryId:"/api/content/selectTbContentAllByCategoryId"


}

export default base