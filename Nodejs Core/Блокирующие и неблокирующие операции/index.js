const fs = require('fs');
const path = require('path');

const pathFile = path.join(__dirname, 'file.txt');
const pathLargeFile = path.join(__dirname, 'largeFile.txt');

const dataSync = fs.readFileSync(pathFile);
console.log(`Содержимое файла:\n${dataSync}`);

console.time('Async')
fs.readFile(pathLargeFile, 'utf8', () => {
    console.timeEnd('Async');
});

console.time('Sync');
fs.readFileSync(pathLargeFile);
console.timeEnd('Sync');
