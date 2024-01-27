import http from "http";

export const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>vax</title>
      </head>
      <body>
        <h1>BOT ONLINE</h1>
      </body>
    </html>
  `);
});
