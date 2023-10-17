import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {

    const req = await request.json();

    const { barberId, day, hour, name, phoneNumber } = req;

    const barber = await prisma.barber.findUnique({
        where: {
            id: barberId
        }
    })
    if (!barber) {
        return new NextResponse(
          JSON.stringify({
            error: {
              code: "BARBER_NOT_FOUND",
            },
          })
        );
    }
    
    await prisma.scheduling.create({
        data: {
            day: new Date(day),
            hour,
            barberId,
            name,
            phoneNumber,
            dateTime: new Date(day)
        }
    });

    return new NextResponse(JSON.stringify({
        success: true
    }),{
        status:201
    })
}