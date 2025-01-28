<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from "vue"
// import { useVirtualList } from '@vueuse/core'

const draggableTable = useTemplateRef("draggable-table")
const tableData = ref()

onMounted(() => {
  initData()

  if(draggableTable.value) {
    createResizableDraggableTable(draggableTable.value)
  }
})

// const { list } = useVirtualList(tableData, {
//   itemHeight: 22
// })

function initData() {
  const data = []
  for(let i = 0; i < 5000; i++) {
    data.push({
      id : i,
      col1 : `Row ${i + 1} Col 1`,
      col2 : `Row ${i + 1} Col 2`,
      col3 : `Row ${i + 1} Col 3`,
      col4 : `Row ${i + 1} Col 4`,
    })
  }

  tableData.value = data
}

function createResizableDraggableTable(table: HTMLTableElement) {
  let draggedIndex: number|null = null;

  // Add drag-and-drop event listeners to the headers
  table.querySelectorAll('th').forEach((header, index) => {
    const resizeHandle = header.querySelector('.resize-handle');

    header.addEventListener('dragstart', (e) => {
      const headers = Array.from(header.parentNode!.children); // Recalculate current header indices
      draggedIndex = headers.indexOf(header); // Update draggedIndex based on the latest DOM
      // @ts-ignore
      e.target.classList.add('dragging');
    });

    header.addEventListener('dragend', (e) => {
      // @ts-ignore
      e.target.classList.remove('dragging');
    });

    header.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    header.addEventListener('drop', (e) => {
      e.preventDefault();

      // Recalculate the target index based on the latest DOM state
      const headers = Array.from(header.parentNode!.children);
      const targetIndex = headers.indexOf(header);

      // Only proceed if indices are valid and different
      if (draggedIndex !== null && draggedIndex !== targetIndex) {
        swapColumns(draggedIndex, targetIndex);
      }

      draggedIndex = null;
    });

    // Resizing logic
    // @ts-ignore
    resizeHandle.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = header.offsetWidth;

      const mouseMoveHandler = (moveEvent: MouseEvent) => {
        const diff = moveEvent.clientX - startX;
        header.style.width = `${startWidth + diff}px`;

        // Resize only the cells in the current column
        const rows = table.rows;
        Array.from(rows).forEach((row) => {
          row.cells[index].style.width = `${startWidth + diff}px`;
        });
      };

      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  });

  // Function to swap columns
  function swapColumns(fromIndex: number, toIndex: number) {
    const rows = Array.from(table.rows);

    rows.forEach((row) => {
      const cells = Array.from(row.children);

      // Move the cell to the new position
      const movedCell = cells[fromIndex];
      if (fromIndex < toIndex) {
        cells[toIndex].after(movedCell);
      } else {
        cells[toIndex].before(movedCell);
      }
    });
  }
}
</script>

<template>
  <table id="draggableTable" ref="draggable-table">
    <thead>
    <tr>
      <th draggable="true">
        Column 1
        <div class="resize-handle"></div>
      </th>
      <th draggable="true">
        Column 2
        <div class="resize-handle"></div>
      </th>
      <th draggable="true">
        Column 3
        <div class="resize-handle"></div>
      </th>
      <th draggable="true">
        Column 4
        <div class="resize-handle"></div>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in tableData" :key="item.id">
      <td>{{ item.col1 }}</td>
      <td>{{ item.col2 }}</td>
      <td>{{ item.col3 }}</td>
      <td>{{ item.col4 }}</td>
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
  background-color: #f4f4f4;
  cursor: grab;
  position: relative;
  overflow: visible;
}

th.dragging {
  opacity: 0.5;
}
/* Resize handle styling */
.resize-handle {
  cursor: ew-resize;
  position: absolute;
  top: 0;
  right: -5px;
  width: 10px;
  height: 100%;
  /* background-color: #888; */
  z-index: 1;
}
</style>
