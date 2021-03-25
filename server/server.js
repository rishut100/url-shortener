const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", (err) => {
  console.error("connection error:", err);
});

const shorten = require("./routes/api/shorten");
app.use("/api/shorten", shorten);

const redirect = require("./routes/api/redirect");
app.use("/api/redirect", redirect);

app.get("/:hash", (req, res) => {
  const hash = req.params.hash;
  console.log(hash);
  URL.findOne({ hash: hash }, (err, doc) => {
    if (doc) {
      console.log(doc.url);
      let url = doc.url;
      let result = url.substring(0, 8);
      if (result === "https://") {
        res.redirect(url);
      } else {
        res.redirect("https://www." + url);
      }
      let count = doc.count;
      count = count + 1;
      doc.set({ count: count });
      doc
        .save()
        .then(() => console.log("count is :", count))
        .catch((err) => console.log("error is :", err));
    } else {
      res.redirect("/");
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
