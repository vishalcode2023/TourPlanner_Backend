const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  place: { type: String, required: true },
  seats: { type: Number, required: true },
  title: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  travelDate: { type: Date, required: true },
  type: { type: String, required: true } 
});

module.exports = mongoose.model("BusBooking", BusSchema);
