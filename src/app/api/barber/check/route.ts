import { prisma } from "@/lib/prisma";
import { differenceInHours, isAfter } from "date-fns";
import { NextResponse } from "next/server";
import { formatInTimeZone } from 'date-fns-tz'

export async function POST(request:Request) {
    const req = await request.json();
    const finalDate = req.dateTime

    const barber = await prisma.barber.findUnique({
      where: {
        id: req.barberId,
      }
    });
    if (!barber) {
      return new NextResponse(
        JSON.stringify({
          error: {
            code: "BARBER_NOT_FOUND",
          },
        })
      );
    }
  // Verifique se o dateTime está entre 07h00 e 21h30 
    const startOfDay = new Date(finalDate);
    startOfDay.setHours(7, 0, 0, 0);
    const endOfDay = new Date(finalDate);
    endOfDay.setHours(21, 30, 0, 0);



    if (finalDate < startOfDay || finalDate > endOfDay) {
        return new NextResponse(JSON.stringify({
          error: {
            code: "OUTSIDE_WORKING_HOURS",
          },
          barber
        }));
      }

    const schedules = await prisma.scheduling.findMany({
        /*where: {
            barberId: req.barberId,
            dateTime: finalDate,
        }*/
    });
    schedules.map(m=> console.log(`>>>>>>>>>>>>> DATES : ${m.dateTime}`))

    const schedule = await prisma.scheduling.findMany({
      where: {
          barberId: req.barberId,
          dateTime: req.dateTime
      }
  });
    const currentDateTime = new Date();
    /*if (isAfter(finalDate, currentDateTime) && differenceInHours(finalDate, currentDateTime) < 24) {
      return new NextResponse(JSON.stringify({
        error: {
          code: "LESS_THAN_24_HOURS",
        },
        barber
      }));
    }*/

    if(schedule.length > 0){
        return new NextResponse(JSON.stringify({
            error: {
                code: "BARBER_ALREADY_RESERVED",
            },
            barber
        }));
    
      }
      
      return new NextResponse(JSON.stringify({
          success: true,
          barber,
          data: finalDate
      }));
      
    
}