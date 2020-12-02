<template>
  <el-dialog
    title="编辑商品"
    :visible.sync="dialogEditorVisible"
    width="80%"
    :before-close="handleClose"
  >
    <el-form
      label-width="70px"
      :label-position="labelPosition"
      :model="addFrom"
      ref="ruleForm"
    >
      <el-form-item label="商品类目">
        <el-button
          class="category"
          type="primary"
          @click="dialogCategoryVisible = true"
          >类目选择</el-button
        >
        <span class="category">{{ treeData.name }}</span>
      </el-form-item>
      <el-dialog
        width="50%"
        title="类目选择"
        :visible.sync="dialogCategoryVisible"
        append-to-body
      >
        <ProductTree @treeData="getTreeData" />

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="getCategoryVisible">确定</el-button>
        </span>
      </el-dialog>

      <el-form-item label="商品名称">
        <el-input v-model="addFrom.name" type="primary"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点">
        <el-input v-model="addFrom.sellPoint" type="primary"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="addFrom.price" type="primary"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="addFrom.num" type="primary"></el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-button
          class="category"
          type="primary"
          @click="dialogUploadVisible = true"
          >图片上传</el-button
        >
        <span class="category">{{ uploadData.url }}</span>
        <el-dialog
          width="50%"
          title="上传图片"
          :visible.sync="dialogUploadVisible"
          append-to-body
        >
          <ProductUpload @upload="getUpload" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品描述">
        <ProductWangEditor @onEditor="getEditor" :editorData="editorContent"/>
        <!-- <ProductBaiduUEditor /> -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogEditorVisible = false">取消</el-button>
      <el-button type="primary" @click="sureSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ProductUpload from "./ProductUpload";
import ProductBaiduUEditor from "./ProductBaiduUEditor";
import ProductWangEditor from "./ProductWangEditor";
import ProductTree from "./ProductTree";
import api from "../../api";
import { mapState,mapMutations } from "vuex"
export default {
  data() {
    return {
      dialogEditorVisible: false,
      dialogUploadVisible: false,
      dialogCategoryVisible: false,
      labelPosition: "left",
      addFrom: {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      },
      treeData: {},
      uploadData: {},
      editorData: "",
      currentId:0
    };
  },
  components: {
    ProductBaiduUEditor,
    ProductWangEditor,
    ProductUpload,
    ProductTree,
  },
  computed:{
    ...mapState("editorModule",{
      editorContent:state => state.editorContent
    })
  },
  mounted() {
    //编辑显示
    this.$bus.$on("onEditor", (row) => {
      // console.log(row.id);
      this.dialogEditorVisible = true;
      this.currentId = row.id
      api
        .preUpdateItem({
          id: row.id,
        })
        .then((res) => {
          // console.log(res.data.result[0]);
          this.preCategoryData(res.data.result[0].cid)
          this.addFrom = {
            name: res.data.result[0].title,
            sellPoint: res.data.result[0].sellPoint,
            price: res.data.result[0].price,
            num: res.data.result[0].num,
          };
          this.uploadData = {
              url: res.data.result[0].image
          };
          this.editorData = res.data.result[0].descs
          this.setEditorContent(this.editorData)
        });
    });
  },
  methods: {
    ...mapMutations("editorModule",["setEditorContent"]),
    handleClose() {
      this.dialogEditorVisible = false;
    },
    //点击确定编辑
    sureSubmit() {
      api.updateTbItem({
        id:this.currentId,
        title:this.addFrom.name,
        sellPoint:this.addFrom.sellPoint,
        price:this.addFrom.price,
        num:this.addFrom.num,
        cid:this.treeData.cid,
        desc:this.editorData,
        image:this.uploadData.url,
        
      }).then(res=>{
        // console.log(res.data);
        if(res.data.status === 200){
          this.dialogEditorVisible = false;
          this.$bus.$emit("onRef",true)
        }else{
          this.$message.error("修改失败");
        }
      })
    },
    //上传数据
    getUpload(data) {
      this.uploadData = data;
      this.dialogUploadVisible = false;
    },
    //类目选择
    getCategoryVisible() {
      this.dialogCategoryVisible = false;
    },
    //类目选择数据
    getTreeData(data) {
      // console.log(data);
      this.treeData = data;
    },
    //商品描述
    getEditor(data) {
      // console.log(data);
      this.editorData = data;
    },
    //初始化数据
    initForm() {
      this.addFrom = {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      };
      this.treeData = {};
      this.uploadData = {};
      this.editorData = "";
    },
    preCategoryData(cid){
      api.preCategory({
        cid
      }).then(res=>{
        console.log(res);
        if(res.data.status === 200){
          this.treeData = {
            name: res.data.result[0].name,
          };
        }else{
          this.treeData = {
            name: res.data.msg,
          };
        }
      })
    }
  },
};
</script>

<style scoped lang="less">
.category {
  float: left;
  margin-right: 20px;
}
.upload-img {
  width: 400px;
  float: left;
}
</style>