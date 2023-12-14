import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    imagen: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        trim: true,
    },
    titulo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Image', imageSchema);
