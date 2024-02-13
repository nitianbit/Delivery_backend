import mongoose from "mongoose";


const menuItemSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
});

export default mongoose.model('MenuItem', menuItemSchema);