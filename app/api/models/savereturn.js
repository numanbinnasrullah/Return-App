import mongoose from "mongoose";

// Define the schema for the user collection
const returnDataScheema = new mongoose.Schema({
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
  returndate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the user schema
export const Returns = mongoose.models.Returns || mongoose.model("Returns", returnDataScheema);

