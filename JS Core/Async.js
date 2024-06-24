// Напишите функцию, которая параллельно загружает данные с нескольких удаленных
// серверов, используя Promise.all в сочетании с async/await

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://randomuser.me/api'
];

const multipleRequest = async (urls) => {
    const promises = urls.map(url =>
      fetch(url).then(res => res.json())
    );
    const result = await Promise.all(promises);
    return result;
};

multipleRequest(urls)
  .then(data => console.log(data))
  .catch(e => console.error(e));
