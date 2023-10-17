import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

    const barbers = await prisma.barber.findMany();

    return new NextResponse(JSON.stringify({ 
        success: true,
        barbers
    }),{status: 200});
}

export async function POST(request:Request) {

    const req = await request.json();

    // TO-DO : Validações dos atributos do Barber;
    
    const barber = await prisma.barber.create({
        data: {
            name: req.name,
            dayOff: req.dayOff,
            startTime: new Date(req.startTime),
            endTime: new Date(req.endTime),
            start: req.start,
            end: req.end
        }

    });

    return new NextResponse(JSON.stringify({
        success: true,
        barber
    }))
}
