import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const req = await request.json();
    const currentDay = new Date();
    const schedules = await prisma.scheduling.findMany({
        where: {
            barberId: req.barberId,
            
        }
    });
    const dates: Date[] = [];

    console.log(schedules.length)
    schedules.map(s => {
        dates.push(s.dateTime);
    })
    console.log(dates)
    
    return new NextResponse(JSON.stringify({ dates }));
}