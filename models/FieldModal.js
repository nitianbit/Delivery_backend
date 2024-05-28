import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
    label: String,
    type: String,
    options: [String],
});

const Field = mongoose.model('Field', fieldSchema);

export default Field
