// Напишите функцию, которая принимает
// массив с числами и находит сумму квадратов
// элементов этого массива.

const sumSquares = (arr) => {
    return arr.reduce((sum, n) => sum + n * n, 0);
}

console.log(sumSquares([1,9,3]));