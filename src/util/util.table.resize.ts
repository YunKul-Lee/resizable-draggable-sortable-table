function createResizableTable(table: HTMLElement|null) {
  if (!table) return

  const cols = table.querySelectorAll('th');
  [].forEach.call(cols, function (col: HTMLTableCellElement) {
    // Add a resizer element to the column
    const resizer = document.createElement('div');
    resizer.classList.add('resizer');

    // Set the height
    resizer.style.height = table.offsetHeight + 'px';
    col.appendChild(resizer);

    createResizableColumn(col, resizer);
  });

  function createResizableColumn(col: HTMLElement, resizer: HTMLElement) {
    let x = 0;
    let w = 0;

    const mouseDownHandler = function (e: MouseEvent) {
      x = e.clientX;

      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      resizer.classList.add('resizing');
    };

    const mouseMoveHandler = function (e: MouseEvent) {
      const dx = e.clientX - x;
      col.style.width = (w + dx) + 'px';
    };

    const mouseUpHandler = function () {
      resizer.classList.remove('resizing');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  }
}

export { createResizableTable }