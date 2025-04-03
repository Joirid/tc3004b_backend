import mongoose from "mongoose";

const itemSchema = mongoose.Schema(
    {
        name: {type: String, unique: true, trim: true},
        price: {type: Number, default: 0},
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("item", itemSchema);