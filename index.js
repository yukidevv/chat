const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

const httpserver = http.createServer((req, res) =>
  console.log("we have received a request")
);

const websocket = new WebSocketServer({
  httpServer: httpserver,
});

httpserver.listen(8080, () =>
  console.log("My server is listening on port 8080")
);

websocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`);
  });
  sendevery5seconds();
});

function sendevery5seconds() {
  connection.send("Hello, this is a message from the server");
  setTimeout(sendevery5seconds, 5000);
}
