<template>
  <div>
    <!-- 广告树状图 -->
    <el-tree
      highlight-current
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :render-content="renderContent"
    >
    </el-tree>
    <!-- 添加子导航的对话框 -->
    <el-dialog
      title="添加子导航"
      :visible.sync="dialogAddNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 子导航的信息 -->
      <el-form ref="ruleForm" :model="navForm">
        <el-form-item label="导航名称">
          <el-input v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddNavHandle">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改的对话框 -->
    <el-dialog
      title="添加子导航"
      :visible.sync="dialogUpdateNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 修改子导航的信息 -->
      <el-form ref="ruleForm" :model="navForm">
        <el-form-item label="修改导航名称">
          <el-input v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdateNavHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
export default {
    name:"ContentNav",
  inject: ["reload"],
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
      navForm: {
        name: "",
      },

      dialogAddNavVisible: false,
      dialogUpdateNavVisible: false,
      navData: {},
    };
  },
  methods: {
    http(level, resolve) {
      api.selectContentCategoryByParentId(level).then((res) => {
        // console.log(res.data);
        if (res.data.status === 200) {
          return resolve(res.data.result);
        } else {
          return resolve([]);
        }
      });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.http({ id: 1 }, resolve);
      }
      if (node.level >= 1) {
        this.http(
          {
            id: node.data.pid,
          },
          resolve
        );
      }
    },
    handleNodeClick(node) {
        this.$bus.$emit("contentInfo",node)
    },
    //那些小标签
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node, data)}
            >
              添加子导航
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    append(node, data) {
      console.log(node, data);
      this.navData = data;
      this.dialogAddNavVisible = true;
    },
    update(node, data) {
        this.navData = data
        this.dialogUpdateNavVisible = true
    },
    remove(node, data) {
      api
        .deleteContentCategoryById({
          pid: data.pid,
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.status === 200) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.reload();
          }
        });
    },
    handleClose() {
      this.dialogAddNavVisible = false;
    },
    //确定按钮
    sureAddNavHandle() {
      api
        .insertContentCategory({
          pid: this.navData.pid,
          name: this.navForm.name,
        })
        .then((res) => {
        //   console.log(res.data);
          if (res.data.status === 200) {
            this.dialogAddNavVisible = false;
            this.reload();
          } else {
            this.$message("添加失败");
          }
        });
    },
    //修改确定按钮
    sureUpdateNavHandle() {
        console.log(this.navData.pid);
        console.log(this.navForm.name);
      api
        .updateContentCategory({
          pid: this.navData.pid,
          name: this.navForm.name,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            (this.dialogUpdateNavVisible = false),
              this.$message({
                message: "删除成功",
                type: "success",
              });
            this.reload();
          }
        });
    },
  },
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>