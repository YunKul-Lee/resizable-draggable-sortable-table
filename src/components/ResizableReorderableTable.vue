<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue";
import { createResizableTable, createReorderableTable } from "@/util/util.table.resizable.reorderable.ts";

const flexibleTable = useTemplateRef('flexible-table')
const tableData = ref()

onMounted(() => {
  tableData.value = makeData()

  if(flexibleTable.value) {
    createResizableTable()
    createReorderableTable(flexibleTable.value)
  }
})


function makeData() {
  const amount = 10
  const data = []
  for (let i = 0; i < amount; i++) {
    data.push({
      id: i,
      data1: `Data 1-${i}`,
      data2: `Data 2-${i}`,
      data3: `Data 3-${i}`
    })
  }

  return data
}
// TODO :: 데이터 양을 늘려서 성능측정 해보자
//  - 3천
//  - 5천
//  - 1만
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
      <tr v-for="item in tableData" :key="item.id">
        <td>{{ item.data1 }}</td>
        <td>{{ item.data2 }}</td>
        <td>{{ item.data3 }}</td>
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