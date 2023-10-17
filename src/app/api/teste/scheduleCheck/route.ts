import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    // Buscar todos os schedules do dia 
    const schedulesByDay = await prisma.scheduling.findMany({
        where:{
            barberId,
            day
        }
    })

    // Retirar apenas as horas ocupadas
    const blockedHours = ["12:30","13:00","13:30"]
    schedulesByDay.map(schedule => blockedHours.push(schedule.hour));

    // Criar todos os horarios
    function gerarHorarios(inicio: number, fim: number): string[] {
        const horarios: string[] = [];
        
        for (let hora = inicio; hora <= fim; hora++) {
          for (let minutos = 0; minutos < 60; minutos += 30) {
            const horaFormatada = hora.toString().padStart(2, '0');
            const minutosFormatados = minutos.toString().padStart(2, '0');
            horarios.push(`${horaFormatada}:${minutosFormatados}`);
          }
        }
      
        return horarios;
    }

    // Retira os horarios indisponiveis
    const availableHours = gerarHorarios(barber.start, barber.end)
    blockedHours.map(b => {
        if(availableHours.includes(b)){
            availableHours.splice(availableHours.indexOf(b),1)
        }
    }) 

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
