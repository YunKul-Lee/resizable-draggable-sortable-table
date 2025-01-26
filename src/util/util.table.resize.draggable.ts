function createResizeAndDraggableTable(table: HTMLTableElement) {
    const headers: NodeListOf<HTMLTableCellElement> = table.querySelectorAll('th')
    const resizers = table.querySelectorAll('.resizer')

    let draggedColumn: number|null = null
    let isResizing = false
    let lastDownX = 0
    // TODO :: 테이블 컬럼 길이 계산 필요
    let columnWidths: number[] = Array(headers.length).fill(100)

    // Column 순서 변경 이벤트 처리
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
            if (draggedColumn !== null && draggedColumn !== overColumn) {
                const rows = table.querySelectorAll('tr')

                rows.forEach(row => {
                    const cells = row.querySelectorAll('td, th')
                    const draggedCell = cells[draggedColumn!] as HTMLTableCellElement
                    const overCell = cells[overColumn] as HTMLTableCellElement

                    // 셀 교환
                    const tempCell = draggedCell.innerHTML
                    draggedCell.innerHTML = overCell.innerHTML
                    overCell.innerHTML = tempCell
                })

                draggedColumn = overColumn
            }
        })
    })

    // Column 너비 조정 이벤트 처리
    resizers.forEach((resizer, index) => {
        // @ts-ignore
        resizer.addEventListener('mousedown', (e: MouseEvent) => {
            isResizing = true
            lastDownX = e.clientX
            document.body.style.cursor = 'ew-resize'
            resizers[index].parentElement?.classList.add('resizing')

            // 마우스 이동 및 마우스 업 이벤트 처리
            const onMouseMove = (e: MouseEvent) => {
                if (isResizing) {
                    const offset = e.clientX - lastDownX
                    const newWidth = columnWidths[index] + offset
                    columnWidths[index] = newWidth

                    // Column 길이 업데이트
                    headers[index].style.width = `${newWidth}px`

                    const rows = table.querySelectorAll('tr')
                    rows.forEach(row => {
                        row.cells[index].style.width = `${newWidth}px`
                    })

                    lastDownX = e.clientX
                }
            }

            const onMouseUp = () => {
                isResizing = false
                document.body.style.cursor = ''
                resizers[index].parentElement?.classList.remove('resizing')
                document.removeEventListener('mousemove', onMouseMove)
                document.removeEventListener('mouseup', onMouseUp)
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        })
    })
}

export { createResizeAndDraggableTable }