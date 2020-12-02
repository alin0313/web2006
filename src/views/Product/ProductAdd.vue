<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogAddVisible"
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
        <ProductWangEditor @onEditor="getEditor" />
        <!-- <ProductBaiduUEditor /> -->
      </el-form-item>
      <div v-for="(item,index) in treeDataEditor" :key="index">
                <h3>{{ item.value }}</h3>
                <div v-for="(childItem,childIndex) in item.children" :key="childIndex">
                    <el-form-item label-width="130px" :label="childItem.childValue">
                        <el-input v-model="childItem.value" type="text"></el-input>
                    </el-form-item>
                </div>
            </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAddVisible = false">取消</el-button>
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
export default {
  data() {
    return {
      dialogAddVisible: false,
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
      treeDataEditor: [],
    };
  },
  components: {
    ProductBaiduUEditor,
    ProductWangEditor,
    ProductUpload,
    ProductTree,
  },
  mounted() {
    this.$bus.$on("productAddVisible", (flag) => {
      this.dialogAddVisible = flag;
    });
  },
  methods: {
    handleClose() {
      this.dialogAddVisible = false;
    },
    //点击确定
    sureSubmit() {
      api
        .insertTbItem({
          title: this.addFrom.name,
          cid: this.treeData.cid,
          sellPoint: this.addFrom.sellPoint,
          price: this.addFrom.price,
          num: this.addFrom.num,
          desc: this.editorData,
          image: this.uploadData.url,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.dialogAddVisible = false; //添加成功后关闭添加页面
            this.$bus.$emit("onRef", true);
            this.initForm();
          } else {
            this.$message.error("添加失败");
          }
        });
    },
    //上传数据
    getUpload(data) {
      this.uploadData = data;
      this.dialogUploadVisible = false;
    },
    //类目选择确定按钮
    getCategoryVisible() {
      api
        .paramsItem({
          cid: this.treeData.cid,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            this.treeDataEditor = JSON.parse(res.data.result[0].paramData);
            this.dialogCategoryVisible = false;
          }else{
            this.$message("请选择分类")
          }
        });
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