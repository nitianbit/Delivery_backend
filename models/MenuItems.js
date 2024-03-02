import mongoose from "mongoose";


const menuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    gst: { type: Number },
    maxQuantity: { type: Number }
});
//gst= roti:5%,rumali:12%,parantha:18%

export default mongoose.model('MenuItem', menuItemSchema);