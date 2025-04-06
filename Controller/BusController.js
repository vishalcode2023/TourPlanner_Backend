const BusBooking = require('../Model/BusModel');
const BillTemplate = require('../Templates/BillTemplate')

module.exports.BusController = async (req, res) => {
  try {
    const {
      adults,
      children,
      place,
      seats,
      title,
      totalPrice,
      travelDate,
      type
    } = req.body;

    const newBooking = new BusBooking({
      adults,
      children,
      place,
      seats,
      title,
      totalPrice,
      travelDate,
      type
    });

    const savedBooking = await newBooking.save();

    await BillTemplate(newBooking.place,newBooking.totalPrice);

    res.status(201).json({
      message: "Booking created successfully",
      data: savedBooking
    });

  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      message: "Failed to create booking",
      error
    });
  }
};

// GET: Get all bookings
module.exports.GetBusController = async (req, res) => {
  try {
    const bookings = await BusBooking.find().sort({ travelDate: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      message: "Failed to fetch bookings",
      error
    });
  }
};
