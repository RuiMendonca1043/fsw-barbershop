import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { scheduler } from "timers/promises";

export async function POST(request:Request) {
    const req = await request.json()

    const {barberId, day} = req;

    // Verifica se o barbeiro existe
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
        const horarios: string[] = ['Selecionar horário'];
        
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
    
    return new NextResponse(JSON.stringify({ 
        success: true,
        availableHours
    }),{status: 200});
}