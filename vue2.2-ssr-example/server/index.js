const fs = require('fs');
const path = require('path');
const express = require('express');
const vueServerRenderer = require('vue-server-renderer');

const app = express();

// Client-Side Bundle File
const clientBundleFilePath = path.join(__dirname, '../dist/bundle.client.js');
const tplPath = path.join(__dirname, '../index.html');
const tpl = fs.readFileSync(tplPath, 'utf-8')
const clientBundleFileUrl = '/bundle.client.js';

// Server-Side Bundle File
const bundleRenderer = vueServerRenderer.createBundleRenderer(path.join(__dirname, '../dist/vue-ssr-bundle.json'), {
  template: tpl
});


// Server-Side Rendering
app.get('/', function (req, res) {
  bundleRenderer.renderToString({url: req.url}, (err, html) => {
    if (err){
      res.status(500).send(`
        <h1>Error: ${err.message}</h1>
        <pre>${err.stack}</pre>
      `);
    } else {
      res.send(`${html}`);
    }
  });
});

// Client-Side Bundle File
app.get(clientBundleFileUrl, function (req, res) {
  console.log(req.url)
  const clientBundleFileCode = fs.readFileSync(clientBundleFilePath, 'utf8');
  res.send(clientBundleFileCode);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
