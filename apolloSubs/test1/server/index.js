import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config';
import open from 'open';
import serve from 'koa-static-server';
import fs from 'fs';
import Koa from 'koa';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';

const port = 3000;
const app = new Koa();
const compiler = webpack(config);

app.use(serve({rootDir: 'client'}));
app.use(serve({rootDir: 'dist'}));

app.use( webpackDevMiddleware(compiler, {
  noInfo : true,
  publicPath: config.output.publicPath
}) );

app.use( webpackHotMiddleware(compiler) );

app.use(ctx => {
  const targetFile = path.join( __dirname, '../client', 'index.html');
  ctx.body = fs.readFileSync(targetFile, 'utf8');
});

app.listen(port, function(err) {
  if (err) {
    return err;
  } else {
    open(`http://localhost:${port}`);
  }
});
