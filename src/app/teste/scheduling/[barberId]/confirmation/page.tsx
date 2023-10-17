"use client"
import Button from "@/components/Button";
import { Barber } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ptBR from "date-fns/locale/pt";
import { format } from "date-fns";

const SchedulingConfirmation = ({ params }: { params: { barberId: string } }) => {
    const [barber, setBarber] = useState<Barber | null>();
    const [day, setDay] = useState<Date | null>();
    const [hour, setHour] = useState<string | null>();
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log('entrei')
    useEffect(()=>{
        const fetchSchedule =async () => {
            const response = await fetch("https://fsw-barbershop.vercel.app/api/teste/scheduleCheck", {
                method:'POST',
                body:JSON.stringify({
                    barberId: params.barberId,
                    day: searchParams.get('day'),
                    hour: searchParams.get('hour')
                }),
            });
            const res = await response.json();

            if(res?.error){
                return router.push('/')
            }
            console.log(res)
            //console.log(`${res.barber}  ${res.day}  ${res.hour}`)
            setBarber(res.barber);
            setDay(res.day);
            setHour(res.hour);
        };
        fetchSchedule();
    }, [searchParams, params, router]);

    if(!barber || !day || !hour){
        return null;
    }

    const handleConfirmClick =async () => {
        const res = await fetch("https://fsw-barbershop.vercel.app/api/teste/createSchedule", {
            method:'POST',
            body: Buffer.from(JSON.stringify({
                barberId: barber.id,
                day,
                hour, 
                name: searchParams.get('name'), 
                phoneNumber: searchParams.get('phoneNumber')
            }))
        });
        if (!res.ok) {
            return toast.error("Ocorreu um erro ao realizar a marcação!", { position: "bottom-center" });
        }

        toast.success("Marcação realizada com sucesso!", { position: "bottom-center" });
    };
    
    const name = searchParams.get("name") as string;
    const data = new Date(searchParams.get('day') as string);

    return ( <div className="container mx-auto p-5 lg:max-w-[600px]">
    <h1 className="font-semibold text-xl text-primaryDarker">Sua Marcação</h1>  
        <div className="flex flex-col p-5 mt-5 border-grayLighter border-solid border shadow-lg rounded-lg">
            <div className="flex flex-col justify-center items-center gap-3 pb-5 border-b border-grayLighter border-solid">
                <div className="flex gap-2">
                    <h2 className=" text-2xl text-primaryDarker font-semibold">{format(data, "dd 'de' MMMM", { locale: ptBR })}</h2>
                    <h2 className="text-2xl text-primaryDarker font-semibold">às {hour}h</h2>
                </div>
                <div className="flex flex-col">
                <div className="flex gap-3">
                    <h2 className="text-xl text-primaryDarker font-medium">Barbeiro:</h2>
                    <h2 className="text-xl text-primaryDarker ">{barber.name}</h2>
                </div>
                <div className="flex gap-3">
                    <h2 className="text-xl text-primaryDarker font-medium">Cliente:</h2>
                    <h2 className="text-xl text-primaryDarker ">{name}</h2>
                </div>
                </div>
            </div>
        </div> 
        <Button className="w-full mt-5 p-3" onClick={handleConfirmClick}>Confirmar Marcação</Button>

</div> );
};
 
export default SchedulingConfirmation;