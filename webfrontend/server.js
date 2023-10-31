const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
let app;
let handle;

//Singleton Pattern:
function initializeApp() {
  if (!app) {
    app = next({ dev });
    handle = app.getRequestHandler();
  }
  return app;
}

app = initializeApp();

app.prepare().then(() => {
  const server = express();


  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
