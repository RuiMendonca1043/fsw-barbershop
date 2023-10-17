import { prisma } from "@/lib/prisma";
import BarberReservation from "./BarberResrvationTeste";
const getBarberDetails =async (barberId:string) => {
    const barber = await prisma.barber.findUnique({
        where: {
            id:barberId,
        }
    });
    return barber;
}

const Scheduling = async ({params}: {params: {barberId: string}}) => {
    const barber = await getBarberDetails(params.barberId);
    if(!barber) return null;

    return (<div className="container mx-auto p-5 mt-0 bg-primaryLighter">
    <div className="flex items-center">
        <div className="w-full h-[1px] bg-primary"></div>
        <h2 className="px-5 font-large text-primaryDarker whitespace-nowrap">Marcação para {barber.name}</h2>
        <div className="w-full h-[1px] bg-primary"></div>
    </div>
    <BarberReservation barberId={barber.id} dayOff={barber.dayOff}/>
    <div className="w-full h-[1px] bg-primary"></div>
</div>
);
}
 
export default Scheduling;