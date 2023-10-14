import BarberItem from "@/components/BarberItem";
import { Barber } from "@prisma/client";
import { prisma } from "@/lib/prisma";

async function getBarbers() {
    const barbers = await prisma.barber.findMany({});

    return barbers;
}

const RecommendedBarbers = async () => {
    const data = await getBarbers();

    return (
        <div className="container mx-auto p-5 mt-0 bg-primaryLighter pb-10 border border-primary rounded-lg">
            <div className="flex items-center">
                <div className="w-full h-[1px] bg-primary"></div>
                <h2 className="px-5 font-large text-primaryDarker whitespace-nowrap">Barbeiros</h2>
                <div className="w-full h-[1px] bg-primary"></div>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 my-5">
                {data.map((barber: Barber)=>(
                    <BarberItem key={barber.id} barber={barber}/>
                ))}
            </div>
        </div>
    );
}
 
export default RecommendedBarbers;