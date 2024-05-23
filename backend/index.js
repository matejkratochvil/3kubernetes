const express = require('express');
const { json } = require('express');
const { connect, Schema, model } = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(json());

const quoteSchema = new Schema({
  author: String,
  year: Number,
  occasion: String,
  quote: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const Quote = model('Quote', quoteSchema);

app.get('/returnQuote', async (req, res) => {
  const count = await Quote.countDocuments();
  const random = Math.floor(Math.random() * count);
  const quote = await Quote.findOne().skip(random);
  res.json(quote);
});

app.post('/updateQuote', async (req, res) => {
  const { id, rating } = req.body;
  const update = rating === 'liked' ? { $inc: { likes: 1 } } : { $inc: { dislikes: 1 } };
  await Quote.findByIdAndUpdate(id, update);
  res.sendStatus(200);
});

app.get('/returnTotalRatings', async (req, res) => {
  const likes = await Quote.aggregate([{ $group: { _id: null, totalLikes: { $sum: '$likes' } } }]);
  const dislikes = await Quote.aggregate([{ $group: { _id: null, totalDislikes: { $sum: '$dislikes' } } }]);
  res.json({
    totalLikes: likes[0]?.totalLikes || 0,
    totalDislikes: dislikes[0]?.totalDislikes || 0,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
