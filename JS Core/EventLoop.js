// Сделайте функцию, которая будет генерировать случайные числа от 1 до 10. Сделайте так, чтобы сгенерированное число
// было задержкой функции setTimeout в секундах. Оберните все это в промис. Пусть промис выполнится успешно, если
// сгенерировано число от 1 до 5, и с ошибкой - если от 6 до 10


const numberGenerator = () => {
    return new Promise((resolve, reject) => {
        const number = Math.floor(Math.random() * 10) + 1;
        setTimeout(() => {
           number > 5 ? reject(`Ошибка: ${number}`):resolve(`Успешно: ${number}`)
        }, 1000*number)
    })
}

numberGenerator()
.then(data => console.log(data))
.catch(e => console.log(e))