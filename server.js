const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/anonymous_messages', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose model
const Message = mongoose.model('Message', {
  username: String,
  message: String,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit', async (req, res) => {
  const { username, message } = req.body;
  const newMessage = new Message({ username, message });

  try {
    await newMessage.save();
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
