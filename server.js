http = require('http');
fs = require('fs');
url = require('url'); 

handleRequest = (request, response) =>{
  var addr = request.url,
  q = url.parse(addr, true),
      filePath = '';

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

fs.readFile(filePath, null, function (error, data) {
        if (error) {
            response.writeHead(404);
            response.write('Whoops! File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  })};

http.createServer(handleRequest).listen(8080);