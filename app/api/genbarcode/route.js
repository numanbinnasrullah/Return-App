import { NextResponse } from "next/server";
import { Connect } from "../config/dbase";
import { Orders } from "../models/ordersdata";

export async function POST(get) {
  // Connect();
  // const data = await get.json();
  // console.log("Server Data", data);
  return NextResponse.json({ msg: "Sb OK" }, { status: 200 });
  // try {
    
  //   console.log("sheet data upload showing server", data);
  //   const savedata = await Orders.create(data);
  //   console.log("Ssssssssssssssssssssss", savedata);
  //   return NextResponse.json({ msg: "Sb OK", savedata }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ msg: "ERROR" }, { status: 500 });
  // }
}
