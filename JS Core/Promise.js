// Напишите функцию, которая одновременно извлекает данные из нескольких API и
// возвращает объединенный результат, используя Promises

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://randomuser.me/api'
];

const multipleRequest = (urls) => {
  return new Promise((resolve, reject) => {
    const promises = urls.map(url =>
      fetch(url).then(res => res.json())
    );

    Promise.all(promises)
      .then(data => resolve(data))
      .catch(e => reject(e));
  });
}

multipleRequest(urls)
  .then(data => console.log(data))
  .catch(e => console.error(e));
