const gridContainer = document.createElement('div');
  gridContainer.id = 'grid-container';
  document.body.appendChild(gridContainer);

  const numCols = 60;
  const numRows = 29;
  let cellIndexCounter = 1;

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.textContent = cellIndexCounter++;
      gridContainer.appendChild(cell);
    }
  }