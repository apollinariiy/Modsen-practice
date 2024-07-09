const fs = require('fs');
const readline = require('readline');

const i = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

i.question('Имя файла: ', (fileName) => {
    i.question('Текст: ', (text) => {
        fs.writeFile(fileName, text, (err) => {
            if (err) console.error('Ошибка:', err);
            else console.log('Успешно');
            i.close();
        });
    });
});
