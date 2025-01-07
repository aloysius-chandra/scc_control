const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// Mengatur folder publik untuk file statis
app.use(express.static(path.join(__dirname, 'public')));

// Menangani route default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Menangani route default
app.get('/a', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'address_a.html'));
});

// Menangani route default
app.get('/b', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'address_b.html'));
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
