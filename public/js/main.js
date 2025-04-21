document.getElementById('createBtn').addEventListener('click', () => {
    const rows1 = +document.getElementById('rows1').value;
    const rows2 = +document.getElementById('rows2').value;
    const cols1 = +document.getElementById('cols1').value;
    const cols2 = +document.getElementById('cols2').value;
  
    if (!rows1 || !rows2 || !cols1 || !cols2) {
      alert('Completa todas las dimensiones correctamente.');
      return;
    }
  
    const container = document.getElementById('matrixInputs');
    container.innerHTML = '';
  
    createMatrixInputs('matriz1', rows1, cols1, container);
    createMatrixInputs('matriz2', rows2, cols2, container);
  
    document.getElementById('multiplyBtn').style.display = 'inline-block';
  });
  
  document.getElementById('multiplyBtn').addEventListener('click', () => {
    try {
        const rows1 = +document.getElementById('rows1').value;
        const rows2 = +document.getElementById('rows2') .value;
        const cols1 = +document.getElementById('cols1').value;
        const cols2 = +document.getElementById('cols2').value;

        if (cols1 !== rows2) {
            alert('Las matrices no se pueden multiplicar: columnas de Matriz 1 deben coincidir con filas de Matriz 2.');
            return;
          }
          
  
      const matrix1 = getMatrix('matriz1', rows1, cols1);
      const matrix2 = getMatrix('matriz2', rows2, cols2);
  
      fetch('/multiply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrix1, matrix2 })
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(data => { throw new Error(data.error); });
          }
          return res.json();
        })
        .then(data => showResult(data.result))
        .catch(err => {
          alert('Error: ' + err.message);
          console.error(err);
        });
      
    } catch (e) {
      console.error(e.message);
    }
  });
  
  function createMatrixInputs(id, rows, cols, container) {
    const title = document.createElement('h4');
    title.textContent = id;
    container.appendChild(title);
  
    for (let i = 0; i < rows; i++) {
      const row = document.createElement('div');
      for (let j = 0; j < cols; j++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.id = `${id}_${i}_${j}`;
        input.style.width = '50px';
        row.appendChild(input);
      }
      container.appendChild(row);
    }
  }
  
  function getMatrix(id, rows, cols) {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const val = document.getElementById(`${id}_${i}_${j}`).value;
        if (val === '' || isNaN(val)) {
          throw new Error('Todos los campos deben estar completos y ser numéricos.');
        }
        row.push(Number(val));
      }
      matrix.push(row);
    }
    return matrix;
  }
  
  function showResult(matrix) {
    const resultDiv = document.getElementById('result');
    let html = '<table border="1">';
    matrix.forEach(row => {
      html += '<tr>' + row.map(val => `<td>${val}</td>`).join('') + '</tr>';
    });
    html += '</table>';
    resultDiv.innerHTML = html;
  }
  