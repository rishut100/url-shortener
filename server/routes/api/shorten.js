const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");
const URL = require("../../models/url");
const randomize = require("randomatic");

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

router.post("/", (req, res) => {
  console.log(req.body);
  if (req.body.url) {
    urlData = req.body.url;
  }
  console.log("URL is :", urlData);
  URL.findOne({ url: urlData }, (err, doc) => {
    if (doc) {
      console.log("Entry found in database");
      res.send({
        url: doc.url,
        hash: doc.hash,
        status: 200,
        statusTxt: "OK",
      });
    } else {
      console.log("This is a new url");
      const webaddress = new URL({
        _id: uniqid(),
        url: urlData,
        hash: randomize("?", 5, { chars: "webaddress._id" }),
        count: 0,
      });
      webaddress.save((err) => {
        if (err) {
          return console.log(err);
        } else {
          res.send({
            url: urlData,
            hash: webaddress.hash,
            status: 200,
            statusTxt: "OK",
          });
        }
      });
    }
  });
});

module.exports = router;
