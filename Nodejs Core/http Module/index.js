const http = require('http');
const url = require('url');
const { v4: uuidv4 } = require('uuid');

let users = {};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  const sendResponse = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (method === 'POST' && pathname === '/users') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const id = uuidv4();
      const user = JSON.parse(body);
      users[id] = user;
      sendResponse(201, { id, ...user });
    });

  } else if (method === 'GET' && pathname === '/users') {
    sendResponse(200, users);

  } else if (method === 'GET' && pathname.startsWith('/users/')) {
    const id = pathname.split('/')[2];
    if (users[id]) {
      sendResponse(200, { id, ...users[id] });
    } else {
      sendResponse(404, { error: 'User not found' });
    }

  } else if (method === 'PUT' && pathname.startsWith('/users/')) {
    const id = pathname.split('/')[2];
    if (users[id]) {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const updatedUser = JSON.parse(body);
        users[id] = updatedUser;
        sendResponse(200, { id, ...updatedUser });
      });
    } else {
      sendResponse(404, { error: 'User not found' });
    }

  } else if (method === 'DELETE' && pathname.startsWith('/users/')) {
    const id = pathname.split('/')[2];
    if (users[id]) {
      delete users[id];
      sendResponse(200, { message: 'User deleted' });
    } else {
      sendResponse(404, { error: 'User not found' });
    }

  } else {
    sendResponse(404, { error: 'Not found' });
  }
});

server.listen(3000);
