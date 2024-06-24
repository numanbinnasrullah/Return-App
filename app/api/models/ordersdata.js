import mongoose from "mongoose";

// Define the schema for the user collection
const orderDataScheema = new mongoose.Schema({
  orderref: {
    type: String,
    // unique: true,
  },
  shopname: {
    type: String,
  },
  channel: {
    type: String,
  },
  pcode: {
    type: String,
  },
  qty: {
    type: Number,
  
  },
  product: {
    type: String,
   
  },
  barcode: {
    type: String,
    
  },
  order_date: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the user schema
export const Orders = mongoose.models.Orders || mongoose.model("Orders", orderDataScheema);

