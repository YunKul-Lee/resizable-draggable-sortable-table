/**
 * 테이블 가로길이 조정 가능하도록 적용
 *
 * @param table
 */
function createResizableTable(table: HTMLElement) {

  const cols = table.querySelectorAll('th');

  // 모든 셀의 우측에 resizer 엘리먼트 추가
  cols.forEach(col => {
    // 가로길이 조정을 위한 resizer 속성
    const resizer = document.createElement('div');
    resizer.classList.add('resizer');

    // resizer 크기(높이) 반영
    resizer.style.height = table.offsetHeight + 'px';
    col.appendChild(resizer);

    addResizableColumnEvent(col, resizer);
  });

  /**
   * 길이 조정을 위한 이벤트 등록
   *
   * @param col
   * @param resizer
   */
  function addResizableColumnEvent(col: HTMLElement, resizer: HTMLElement) {
    let x = 0;
    let w = 0;

    // 마우스다운 핸들러
    const mouseDownHandler = function (e: MouseEvent) {
      x = e.clientX;

      const styles = window.getComputedStyle(col);
      w = parseInt(styles.width, 10);

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);

      resizer.classList.add('resizing');
    };

    // 마우스이동 핸들러
    const mouseMoveHandler = function (e: MouseEvent) {
      const dx = e.clientX - x;
      col.style.width = (w + dx) + 'px';
    };

    // 마우스업 핸들러
    const mouseUpHandler = function () {
      resizer.classList.remove('resizing');
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    resizer.addEventListener('mousedown', mouseDownHandler);
  }
}

export { createResizableTable }