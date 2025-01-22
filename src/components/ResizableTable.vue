<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue'
import { createResizableTable } from '@/util/util.table.resize'

const resizeTable = useTemplateRef('resize-table')

onMounted(() => {
  if(resizeTable.value) {
    createResizableTable(resizeTable.value)
  }
})

</script>

<template>
  <table class="table" ref="resize-table">
    <thead>
      <tr>
        <th>No.</th>
        <th>First name</th>
        <th>Last name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Andrea</td>
        <td>Ross</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Penelope</td>
        <td>Mills</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Sarah</td>
        <td>Grant</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Vanessa</td>
        <td>Roberts</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Oliver</td>
        <td>Alsop</td>
      </tr>
      <tr>
        <td>6</td>
        <td>Jennifer</td>
        <td>Forsyth</td>
      </tr>
      <tr>
        <td>7</td>
        <td>Michelle</td>
        <td>King</td>
      </tr>
      <tr>
        <td>8</td>
        <td>Steven</td>
        <td>Kelly</td>
      </tr>
      <tr>
        <td>9</td>
        <td>Julian</td>
        <td>Ferguson</td>
      </tr>
      <tr>
        <td>10</td>
        <td>Chloe</td>
        <td>Ince</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.table {
  border-collapse: collapse;
}
.table,
.table th,
.table td {
  border: 1px solid #ccc;
}
.table th,
.table td {
  padding: 0.5rem;
}
.table th {
  position: relative;
}
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
</style>