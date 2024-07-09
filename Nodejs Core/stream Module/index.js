const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/file/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, filename);
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(3000);
