<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :header-row-style="{ background: '#eef1f6', color: '#606266' }"
    :cell-style="cellStyle"
  >
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: "ElementTable",
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    cellStyle: {
      type: Function,
      default: function () {
        return null;
      },
    },
  },
};
</script>

<style>
</style>