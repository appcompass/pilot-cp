
const fs = require('fs');
const path = require('path');
const vueServerRenderer = require('vue-server-renderer');

const filePath = path.join(__dirname, './dist/vue-ssr-bundle.json')
// const code = fs.readFileSync(filePath, 'utf8');
// const code = require('../dist/bundle');
const bundleRenderer = vueServerRenderer.createBundleRenderer(filePath);


bundleRenderer.renderToString((err, html) => {
  if (err){
    console.log(err.message);
    console.log(err.stack);
  }
  console.log(html);
});
