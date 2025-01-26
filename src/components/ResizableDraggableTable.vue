<script setup lang="ts">

import {onMounted, useTemplateRef} from "vue"
import { createResizableTable } from "@/util/util.table.resize.ts"
import { createDraggableTable } from "@/util/util.table.draggable.ts"

const resizableDraggableTable = useTemplateRef("resizable-draggable-table")

onMounted(() => {
  if(resizableDraggableTable.value) {
    createResizableTable(resizableDraggableTable.value)
    createDraggableTable(resizableDraggableTable.value)
  }
})

</script>

<template>
  <table id="resizable-draggable-table" ref="resizable-draggable-table">
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
      <td>Data 1-1</td>
      <td>Data 2-1</td>
      <td>Data 3-1</td>
      <td>Data 4-1</td>
    </tr>
    <tr>
      <td>Data 1-2</td>
      <td>Data 2-2</td>
      <td>Data 3-2</td>
      <td>Data 4-2</td>
    </tr>
    <tr>
      <td>Data 1-3</td>
      <td>Data 2-3</td>
      <td>Data 3-3</td>
      <td>Data 4-4</td>
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
.resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  cursor: col-resize;
  user-select: none;
}
.resizer:hover,
.resizing {
  border-right: 2px solid #aaa;
}

.resizable {
  border: 1px solid gray;
  height: 100px;
  width: 100px;
  position: relative;
}

.dragging {
  opacity: 0.5;
}
</style>