const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/multiply', (req, res) => {
  const { matrix1, matrix2 } = req.body;

  const rowsM1 = matrix1.length;
  const colsM1 = matrix1[0].length;
  const rowsM2 = matrix2.length;
  const colsM2 = matrix2[0].length;

  if (colsM1 !== rowsM2) {
    return res.status(400).json({ error: 'Las matrices no se pueden multiplicar' });
  }

  const result = Array.from({ length: rowsM1 }, () => Array(colsM2).fill(0));

  for (let i = 0; i < rowsM1; i++) {
    for (let j = 0; j < colsM2; j++) {
      for (let k = 0; k < colsM1; k++) {
        result[i][j] += matrix1[i][k] * matrix2[k][j];
      }
    }
  }

  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
