// Напишите функцию для поиска первого
// неповторяющегося символа.

const findFirstSimbol = (str) => {
return str.split('').find(i => (i !== str[str.indexOf(i)-1]) && (i !== str[str.indexOf(i)+1]))
}

console.log(findFirstSimbol('ssqstrr'));