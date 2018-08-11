import express from 'express';
import path from 'path';

const INDEX_PATH = path.resolve(__dirname, 'index.html');
const JS_PATH = path.resolve(__dirname, '..', 'build', 'js');

const app = express();

const sendIndex = function (req, res) {
  res.sendFile(INDEX_PATH);
};

app.get('/js/:filename', function (req, res) {
  res.sendFile(path.resolve(JS_PATH, req.params.filename));
});

app.get('/', sendIndex);

app.get('*', function (req, res) {
  res.status(404);
  res.sendFile(INDEX_PATH);
});

export default app;

if (process.env.NODE_ENV !== 'test') {
  app.listen(3140);
}
