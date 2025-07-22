const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});