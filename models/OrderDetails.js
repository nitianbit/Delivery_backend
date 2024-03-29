import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
        quantity: Number,
        price: Number,
        name: String,
        gst: Number
    }],
    totalAmount: Number,
    paymentId: String,
    time: { type: Number },
    isOrderConfirmed: { type: Boolean, default: false }, // New field to track order confirmation status
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Delivered, etc.
    address: String,// Address of the order,
    name: String,
    phoneNo: String,
    driverInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    deliveryTime: String
});

export default mongoose.model('Order', orderSchema);