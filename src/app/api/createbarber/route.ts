import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    console.log("hello")
    const bs = await prisma.barber.create({
        data: {
            name: 'Joel Coutinho',
            startTime: new Date(0, 0, 0, 10, 0),
            endTime: new Date(0, 0, 0, 18, 30),
            dayOff: 3
        }
    });

    console.log(bs)

    return new NextResponse(JSON.stringify(bs),{status:200});
}