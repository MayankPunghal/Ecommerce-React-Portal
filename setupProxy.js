// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       target: 'https://localhost:7142/',
//       changeOrigin: true,
//       onError: (err, req, res) => {
//         if (res) {
//           res.writeHead(503, { 'Content-Type': 'text/plain' });
//           res.end('Service Unavailable');
//         }
//       },
//     })
//   );
// };
