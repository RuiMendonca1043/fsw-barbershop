import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
    const req = await request.json();
    const s = await prisma.scheduling.findMany({
        where: {
            barberId: req.barberId
        }
    });
    const b = await prisma.barber.findUnique({
        where: {
            id: req.barberId
        }
    });

    return new NextResponse(JSON.stringify({ s, b }),{status:200});
}