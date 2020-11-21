import { fileURLToPath } from "url";
import { dirname } from "path";
import express from "express";
import fileUpload from "express-fileupload";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(fileUpload());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,PUT, POST, PATCH, DELETE");
    res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.get("/images/:imageId", (req, res) => {
  const imageId = req.params.imageId;
  res.sendFile(`${__dirname}/uploads/${imageId}`);
});

app.post("/upload", (req, res) => {
  if (!req.files) return res.status(400).json({ message: "No file found" });

  const file = req.files.file;
  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});

export default app;
