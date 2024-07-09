const path = require('path');

const filePath = process.argv[2];

const fileName = path.basename(filePath, path.extname(filePath));
const absolutePath = path.resolve(filePath);

console.log(`Имя файла без расширения: ${fileName}`);
console.log(`Абсолютный путь к файлу: ${absolutePath}`);
