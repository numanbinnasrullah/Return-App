import { NextResponse } from "next/server";
import { Connect } from "../config/dbase";
import { Returns } from "../models/savereturn";

Connect();

export async function POST(get) {
  console.log("reports data");
  const data = await get.json();
  console.log("reports data", data);

  try {
    const fetchdata = await Returns.find({
      returndate: { $gte: data.startDate, $lte: data.endDate }
      });

      console.log("Data Came", fetchdata)
    return NextResponse.json(
      { msg: "Data Fetched", fetchdata, data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while processing returns", error);
    return NextResponse.json({ msg: "Not Saved" }, { status: 500 });
  }
}
