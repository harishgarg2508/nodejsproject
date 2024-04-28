// Require necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/contactFormDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create a Mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String
});

// Create a Mongoose model
const Contact = mongoose.model('Contact', contactSchema);

// Create an Express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Route to handle form submission
app.post('/submit', async (req, res) => {
  try {
    const { name, email, mobile, address } = req.body;
    const contact = new Contact({
      name,
      email,
      mobile,
      address
    });
    await contact.save();
    res.status(200).json({ message: 'Contact saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
