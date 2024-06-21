// Напишите функцию, которая принимает
// строку и возвращает количество гласных
// букв в ней. Используйте строгий режим.

'use strict'

const countVowelLetters = (str) => {
    return str.split('').filter(c => /[aeiou]/.test(c.toLowerCase())).length
}

console.log(countVowelLetters('aaAAewsss'));