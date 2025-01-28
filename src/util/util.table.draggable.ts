/**
 * 테이블 컬럼 순서 변경
 */
function createDraggableTable(table: HTMLTableElement) {
    let draggedIndex: number|null = null;

    // Add drag-and-drop event listeners to the headers
    table.querySelectorAll('th').forEach(header => {
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

export { createDraggableTable }