import BarberItem from "@/components/BarberItemTeste";
import { prisma } from "@/lib/prisma";
import { Barber } from "@prisma/client";

const getBarbers =async () => {
  const barbers = await prisma.barber.findMany();
  return barbers;
}

const _Barbers = async () => {
  const barbers = await getBarbers();
  return (
    <div className="container mx-auto p-5 mt-0 bg-primaryLighter pb-10 border border-primary rounded-lg">
        <div className="flex items-center">
            <div className="w-full h-[1px] bg-primary"></div>
            <h2 className="px-5 font-large text-primaryDarker whitespace-nowrap">Barbeiros</h2>
            <div className="w-full h-[1px] bg-primary"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 my-5">
            {barbers.map((barber: Barber)=>(
                <BarberItem key={barber.id} id={barber.id} name={barber.name} />
            ))}
        </div>
    </div>
);
}
export default _Barbers;