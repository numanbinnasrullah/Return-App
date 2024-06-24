import { NextResponse } from "next/server";
import { Connect } from "../config/dbase";
import { Orders } from "../models/ordersdata";

Connect();
export async function POST(get) {
  console.log(" Return Data");
  const data = await get.json();

  try {
    console.log("Return Server Data", data);
    const orderData = await Orders.find({ barcode: data.barcode });
    // const orderData = await Orders.find({ barcode: data.barcode });

    // // If the record is not found, return a 404 response
    console.log("Returnsssssssssssssssssss", orderData.length);
    if (orderData.length <= 0) {
      console.log(" OOOOkkkk");
      return NextResponse.json({ msg: "Record not found" });
    }
    console.log(" a rha hai", orderData);
    return NextResponse.json({ msg: "OK", orderData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "ERROR" }, { status: 500 });
  }
}
