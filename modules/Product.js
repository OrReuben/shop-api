const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: false },
    bidPrice: { type: Number, required: true },
    bidderUsername: { type: String, required: true },
    posterUsername: { type: String, required: true },
    endAuction: { type: String, required: true },
    timeLeft: { type: Number },
    status: { type: String, required:true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
