const razorpay = require("../Model/razorpayModel");

module.exports.createOrder = async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, 
        currency,
        receipt: `receipt_${Math.random() * 1000}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ success: false, error });
    }
};
