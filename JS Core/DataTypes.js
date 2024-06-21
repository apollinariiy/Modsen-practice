// Напишите функцию, которая принимает
// число и выводит в консоль сумму первой и
// последней цифры этого числа

const sumFirstAndLast = (n) => {
    n = n.toString().split('');
    return Number(n[0]) + Number(n[n.length -1])
}

console.log(sumFirstAndLast(523));