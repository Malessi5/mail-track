const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/pix.png", function (req, res) {
  console.log(req);
  console.log(req._remoteAddress);
  console.log(req._startTime);

  //every time this is called, use sockets to send req data to a dashboard
  res.sendFile(path.join(__dirname, "../public/pix.png"));
});
// app.use(express.static(path.join(__dirname, "../public")));

// app.use(function (req,res,next) {
//   const err = new Error('Not found.');
//   err.status = 404;
//   next(err)
// })

// app.get("*", function (req, res) {
//   console.log(req);
//   res.sendFile(path.join(__dirname, "../public/pix.png"));
// });

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Your server, listening on port ${port}`);
});
