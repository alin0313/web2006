<template>
  <el-tree
    highlight-current
    :props="defaultProps"
    :load="loadNode"
    lazy
    @node-click="handleNodeClick"
  >
  </el-tree>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    //异步处理事件
    loadNode(node, resolve) {
      //   console.log(node, resolve);
      if (node.level === 0) {
        api.selectItemCategoryByParentId().then((res) => {
          // console.log(res.data.result);
          if (res.data.status == 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      if (node.level >= 1) {
        // console.log(node);
        api
          .selectItemCategoryByParentId({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.data.status == 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            return resolve([]);
          });
      }
    },

    //节点点击事件
    handleNodeClick(data) {
      //   console.log(data);
      this.$emit("treeData", data);
    },
  },
};
</script>

<style>
</style>