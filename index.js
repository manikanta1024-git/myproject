const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello from Docker + Jenkins! Build ID: ' + process.env.BUILD_NUMBER);
});
server.listen(3000, () => console.log('Server running'));
