import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { scheduler } from "timers/promises";

export async function POST(request:Request) {
    const req = await request.json()

    const {barberId, day, hour} = req;

    const barber = await prisma.barber.findUnique({
        where:{
            id: barberId
        }
    });

    if(!barber){
        return new NextResponse(JSON.stringify({
            error:{
                code: 'BARBER_NOT_FOUND',
            },
            barberId
        }));
    }

    // GET dos horarios disponiveis
    const response = await fetch('/api/teste/availableHours',{
        method:"POST",
        body: Buffer.from(JSON.stringify({
            barberId,
            day
        }))
    })
    
    const res = await response.json();
    const {availableHours} = res; 

    // verifica se a hora requisitada esta disponivel
    if(availableHours.includes(hour)){
        return new NextResponse(JSON.stringify({ 
            success: true,
            barber,
            day,
            hour
        }),{status: 200});
    }else{
        return new NextResponse(JSON.stringify({ 
            error:{
                code: 'BARBER_NOT_AVAILABLE',
            },
            barber,
            day,
            hour
        }),{status: 200});
    }

}
