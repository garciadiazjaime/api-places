import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
  // uuid: { type: String, unique: true },
  title: String,
  description: String,
  url: String,
  image: String,
  price: String,
  date: Date,
  rawDate: String,
  category: Number,
  place: String,
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

const PlaceModel = mongoose.model('place', PlaceSchema);

export default PlaceModel;
