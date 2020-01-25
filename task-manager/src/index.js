const express = require("express");
require("./db/mongoose");
const multer = require("multer");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({
  dest: "images",
  limits: {
    fileSize: 100000
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(doc|docx|pdf|mp4)$/)) {
      return callback(new Error("Please upload a word document"));
    }
    callback(undefined, true);
  }
});
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
