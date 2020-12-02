<template>
  <div class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from "../api";
export default {
  name: "ProductPagination",
  data() {
    return {
      currentPage: 1,
    };
  },
  props:{
      total:{
          type:[String,Number],
          default:0
      }
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange(val) {
      // console.log(val);
      //列表中接收
      this.$emit("page", val);
    },
  },
};
</script>

<style scoped>
.pagination-container {
  margin-top: 40px;
}
</style>