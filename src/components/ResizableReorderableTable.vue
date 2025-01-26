<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { createResizableTable, createReorderableTable } from "@/util/util.table.resizable.reorderable.ts";

const flexibleTable = useTemplateRef('flexible-table')

onMounted(() => {
  if(flexibleTable.value) {
    createResizableTable()
    createReorderableTable(flexibleTable.value)
  }
})
</script>

<template>
  <table id="myTable" ref="flexible-table">
    <thead>
    <tr>
      <th draggable="true"><span class="drag-handle">↕</span> Column 1<div class="resizer"></div></th>
      <th draggable="true"><span class="drag-handle">↕</span> Column 2<div class="resizer"></div></th>
      <th draggable="true"><span class="drag-handle">↕</span> Column 3<div class="resizer"></div></th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
      <td>Data 3</td>
    </tr>
    <tr>
      <td>Data A</td>
      <td>Data B</td>
      <td>Data C</td>
    </tr>
    </tbody>
  </table>
</template>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  position: relative;
}

.resizer {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
  background-color: transparent;
  z-index: 1;
}

.drag-handle {
  cursor: grab;
  display: inline-block;
  margin-left: 5px;
  user-select: none;
}

.dragging {
  opacity: 0.5;
}

body.noselect {
  user-select: none;
  cursor: col-resize;
}
</style>