function createResizableTable() {

    // Resizable columns
    document.querySelectorAll('.resizer').forEach(resizer => {
        let startX: number
        let startWidth: number
        let column: HTMLElement

        // @ts-ignore
        resizer.addEventListener('mousedown', (e: MouseEvent) => {
            e.preventDefault(); // Prevent default drag behavior
            // @ts-ignore
            column = e.target?.parentElement;
            startX = e.pageX;
            startWidth = column.offsetWidth;

            document.body.classList.add('noselect'); // Prevent text selection and add resize cursor
            document.addEventListener('mousemove', resizeColumn);
            document.addEventListener('mouseup', stopResize);
            document.addEventListener('selectstart', preventTextSelection); // Prevent text selection
        });

        function resizeColumn(e: MouseEvent) {
            const newWidth = startWidth + (e.pageX - startX);
            column.style.width = `${newWidth}px`;
        }

        function stopResize() {
            document.body.classList.remove('noselect'); // Revert cursor and selection behavior
            document.removeEventListener('mousemove', resizeColumn);
            document.removeEventListener('mouseup', stopResize);
            document.removeEventListener('selectstart', preventTextSelection); // Restore text selection
        }

        function preventTextSelection(e: Event) {
            e.preventDefault();
        }
    });
}

function createReorderableTable(table: HTMLElement) {
    // Reorder columns
    let draggingElement: Element|null = null;
    let draggingIndex: number|null = null;

    table.querySelectorAll('th').forEach((th, index) => {
        th.addEventListener('dragstart', (e: DragEvent) => {
            draggingElement = th;
            draggingIndex = index;
            th.classList.add('dragging');
            e.dataTransfer!.effectAllowed = 'move'
        });

        th.addEventListener('dragend', () => {
            if (draggingElement) draggingElement.classList.remove('dragging');
            draggingElement = null;
            draggingIndex = null;
        });

        th.addEventListener('dragover', (e: DragEvent) => {
            e.preventDefault();
            // @ts-ignore
            const overElement = e.target?.closest('th');
            if (!overElement || overElement === draggingElement) return;

            const overIndex = Array.from(table.querySelectorAll('th')).indexOf(overElement);
            const parent = th.parentElement;

            if(draggingIndex != null) {
                // @ts-ignore
                if (draggingIndex < overIndex) {
                    parent!.insertBefore(draggingElement!, overElement.nextSibling);
                } else {
                    parent!.insertBefore(draggingElement!, overElement);
                }

                // Update rows in the body
                const bodyRows = table.querySelectorAll('tbody tr');
                bodyRows.forEach(row => {
                    const cells = Array.from(row.children);
                    const reorderedCells = Array.from(parent!.children).map(header => {
                        return cells[Array.from(parent!.children).indexOf(header)]
                    })

                    row.innerHTML = '';
                    reorderedCells.forEach(cell => row.appendChild(cell))
                });

                draggingIndex = overIndex; // Update dragging index
            }

        });
    });
}

export { createResizableTable, createReorderableTable }