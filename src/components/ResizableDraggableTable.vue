<script setup lang="ts">

import {onMounted, useTemplateRef} from "vue"
import { createResizeAndDraggableTable } from '../util/util.table.resize.draggable'


const resizableDraggableTable = useTemplateRef("resizable-draggable-table")

onMounted(() => {
  if(resizableDraggableTable.value) {
    createResizeAndDraggableTable(resizableDraggableTable.value)
  }
})

</script>

<template>
  <table id="resizable-draggable-table" ref="resizable-draggable-table">
    <thead>
    <tr>
      <th draggable="true">
        Column 1
        <div class="resizer"></div>
      </th>
      <th draggable="true">Column 2<div class="resizer"></div></th>
      <th draggable="true">Column 3<div class="resizer"></div></th>
      <th draggable="true">Column 4<div class="resizer"></div></th>
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
      <td>Data 4-3</td>
    </tr>
    <tr>
      <td>Data 1-4</td>
      <td>Data 2-4</td>
      <td>Data 3-4</td>
      <td>Data 4-4</td>
    </tr>
    <tr>
      <td>Data 1-5</td>
      <td>Data 2-5</td>
      <td>Data 3-5</td>
      <td>Data 4-5</td>
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
  position: relative;
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

.resizer {
  cursor: ew-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  z-index: 1;
}

th.resizing {
  background-color: #ddd;
}

</style>