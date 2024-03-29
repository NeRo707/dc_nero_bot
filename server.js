import express from "express";

const server = express();

server.all("/*", (req, res) => {
  res.send("Result: [OK]");
});

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready! " + Date.now().toString());
  });
}

export default keepAlive;
