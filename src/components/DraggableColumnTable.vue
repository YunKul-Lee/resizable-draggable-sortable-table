<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue"
import { createDraggableTable } from "../util/util.table.draggable.ts";

const draggableTable = useTemplateRef("draggable-table")

onMounted(() => {
  if(draggableTable.value) {
    createDraggableTable(draggableTable.value)
  }
})
</script>

<template>
  <table id="draggableTable" ref="draggable-table">
    <thead>
    <tr>
      <th draggable="true">Column 1</th>
      <th draggable="true">Column 2</th>
      <th draggable="true">Column 3</th>
      <th draggable="true">Column 4</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Row 1 Col 1</td>
      <td>Row 1 Col 2</td>
      <td>Row 1 Col 3</td>
      <td>Row 1 Col 4</td>
    </tr>
    <tr>
      <td>Row 2 Col 1</td>
      <td>Row 2 Col 2</td>
      <td>Row 2 Col 3</td>
      <td>Row 2 Col 4</td>
    </tr>
    <tr>
      <td>Row 3 Col 1</td>
      <td>Row 3 Col 2</td>
      <td>Row 3 Col 3</td>
      <td>Row 3 Col 4</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  cursor: move;
  background-color: #f4f4f4;
}
</style>
<style>
.dragging {
  opacity: 0.5;
}
</style>