import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log(file);
  } catch (err) {
    return NextResponse.json({ error: "Error" }, { status: 400 });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
