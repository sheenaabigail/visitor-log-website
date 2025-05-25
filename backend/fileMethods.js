var http = require("http");
var fs = require("fs");

http
  .createServer(async function (req, res) {
    try {
      //checks file system methods

      await fs.appendFile(
        "sample.txt",
        "<p>Appending this text!</p>",
        function (err) {
          if (err) throw err;
          console.log("Appended text successfully.");
        }
      );

     

      await fs.writeFile(
        "textfile2.txt",
        "This is the second file.",
        function (err) {
          if (err) throw err;
          console.log("Wrote text.");
        }
      );
      const data = await fs.readFile("sample.txt");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error: " + err.message);
    }
  })
  .listen(8080);
