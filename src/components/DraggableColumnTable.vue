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
  <table id="draggable-table" ref="draggable-table">
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
        <td>Data 1</td>
        <td>Data 2</td>
        <td>Data 3</td>
        <td>Data 4</td>
      </tr>
      <tr>
        <td>Data 5</td>
        <td>Data 6</td>
        <td>Data 7</td>
        <td>Data 8</td>
      </tr>
      <tr>
        <td>Data 9</td>
        <td>Data 10</td>
        <td>Data 11</td>
        <td>Data 12</td>
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

.dragging {
  opacity: 0.5;
}
</style>