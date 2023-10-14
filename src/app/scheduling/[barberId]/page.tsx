import { prisma } from "@/lib/prisma";
import BarberReservation from "./components/BarberResrvation";

const getBarber = async (barberId:string)=>{
    
    const data = await prisma.barber.findUnique({
        where:{
            id: barberId,
        }
    });
    return data;
}
const getSchedules = async (barberId:string | undefined) => {
    const day = new Date();
    const data = await prisma.scheduling.findMany({
        where: {
            barberId: barberId,
            dateTime: {
                gte: day
            }
        }
    });
    const dates: Date[] = [];
    data.map(s => {
        dates.push(new Date(s.dateTime.getTime()));
    })
    return dates;
}

const Scheduling = async ({params}:{params:{barberId: string}}) => {
    const barber = await getBarber(params.barberId);
    const data = await getSchedules(params.barberId)
    return (<div className="container mx-auto p-5 mt-0 bg-primaryLighter">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-primary"></div>
                <h2 className="px-5 font-large text-primaryDarker whitespace-nowrap">Marcação para {barber?.name}</h2>
                <div className="w-full h-[1px] bg-primary"></div>
            </div>
            <BarberReservation barber={barber} dates={data}/>
            <div className="w-full h-[1px] bg-primary"></div>
        </div>
    );
}
 
export default Scheduling;