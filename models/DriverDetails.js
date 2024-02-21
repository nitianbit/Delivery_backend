import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: String,
    mob_no: String
});

export default mongoose.model('Driver', driverSchema);