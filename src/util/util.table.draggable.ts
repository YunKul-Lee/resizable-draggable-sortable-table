/**
 * 테이블 컬럼 순서 변경
 */
function createDraggableTable(table: HTMLElement) {

    const headers: NodeListOf<HTMLTableCellElement> = table.querySelectorAll('th')
    let draggedColumn: number|null = null

    headers.forEach((header, index) => {
        header.addEventListener('dragstart', (e: DragEvent) => {
            draggedColumn = index
            // @ts-ignore
            e.target.classList.add('dragging')
        })

        header.addEventListener('dragend', (e: DragEvent) => {

            // @ts-ignore
            e.target.classList.remove('dragging')
        })

        header.addEventListener('dragover', (e: DragEvent) => {
            e.preventDefault()
            const overColumn = index

            // 드래그된 열과 현재 마우스의 열이 다른 경우에 Column 순서 변경
            if(draggedColumn !== null && draggedColumn !== overColumn) {
                const rows = table.querySelectorAll('tr')

                rows.forEach(row => {
                    const cells = row.querySelectorAll('td, th')
                    const draggedCell = cells[draggedColumn!] as HTMLTableCellElement
                    const overCell = cells[overColumn] as HTMLTableCellElement

                    if (row === rows[0]) {
                        // 헤더 치환
                        const tempHeader = draggedCell.innerHTML
                        draggedCell.innerHTML = overCell.innerHTML
                        overCell.innerHTML = tempHeader
                    } else {
                        // 내용 치환
                        const tempCell = draggedCell.innerHTML
                        draggedCell.innerHTML = overCell.innerHTML
                        overCell.innerHTML = tempCell
                    }
                })

                // 드래그 된 열 업데이트
                draggedColumn = overColumn
            }
        })
    })
}

export { createDraggableTable }