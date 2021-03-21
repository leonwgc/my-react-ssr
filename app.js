const renderer = require('./dist-ssr/').default;

for (let k of Object.keys(renderer)) {
  console.log(renderer[k]());
}
