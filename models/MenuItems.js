import mongoose from "mongoose";


const menuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
});

export default mongoose.model('MenuItem', menuItemSchema);