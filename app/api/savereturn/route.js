import { NextResponse } from "next/server";
import { Connect } from "../config/dbase";
import { Returns } from "../models/savereturn";
import { Orders } from "../models/ordersdata";

Connect();

export async function POST(get) {
  console.log("returns saving data");
  const data = await get.json();
  console.log("Server returns saving data", data);

  try {
    for (const item of data.checkdata) {
      console.log("Processing item with id", item._id);

      const existingReturn = await Returns.findOne({ _id: item._id });
      if (existingReturn) {
        const orderss = await Orders.findOne({ _id: item._id });
        const totalqtys = Number(orderss.qty) - Number(item.qty);
        orderss.qty = totalqtys;
            await orderss.save();
        const totalqty = Number(existingReturn.qty) + Number(item.qty);
        existingReturn.qty = totalqty;
            await existingReturn.save();
        
        console.log("Data already exists", existingReturn);
        continue; // Skip to the next item if data already exists
      }

      const returnEntry = await Returns.create(item);
      console.log("Created return entry", returnEntry);

      if (returnEntry) {
        const order = await Orders.findOne({ _id: item._id });
        if (order) {
          const remainingQty = Number(order.qty) - Number(item.qty);
          if (remainingQty > 0) {
            order.qty = remainingQty;
            await order.save();
            console.log(
              `Updated order entry with remaining quantity: ${remainingQty}`
            );
          } else {
            await Orders.deleteOne({ _id: order._id });
            console.log("Deleted order entry as remaining quantity is 0");
          }
        }
      }
    }
    return NextResponse.json(
      { msg: "Process completed deleted and added" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while processing returns", error);
    return NextResponse.json({ msg: "Not Saved" }, { status: 500 });
  }
}
