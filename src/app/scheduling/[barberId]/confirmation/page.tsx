'use client'
import {Barber, Scheduling} from '@prisma/client'
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";
import Button from '@/components/Button';
import { toast } from 'react-toastify';



const ScheduleConfirmation = ({ params }: { params: { barberId: string } }) => {
    const [barber, setBarber] = useState<Barber | null>();
    const router = useRouter();

    const searchParams = useSearchParams();
    const client = searchParams.get('name');
    const phoneNumber = searchParams.get('phoneNumber')
    const d = searchParams.get('dateTime') as string;
    const d2 = new Date(d);
    let datas: any[] = []
    
    useEffect(()=>{
        const fetchBarber = async ()=>{
        const response = await fetch(`http://localhost:3000/api/hello`, {
            method: 'POST',
            body: Buffer.from(
                JSON.stringify({
                    barberId: params.barberId,
                    })
                )
            });
        const res = await response.json();

        const s = res.s;
        s.map( (s1: Scheduling) => {
            datas.push(s1.dateTime);
        })
        if(datas.includes(d2.toISOString())){
            console.log('ENCONTREI')
            toast.error("Ocorreu um erro ao realizar a reserva!", { position: "bottom-center" });
            router.push('/')
        }
        setBarber(res.b);
    
    };
    fetchBarber();
    }, []);

    const handleFinishClick = async () => {
        
        const res = await fetch('http://localhost:3000/api/scheduling', {
            method: 'POST',
            body: Buffer.from(JSON.stringify({
                barberId: params.barberId,
                dateTime: d,
                name: client,
                phoneNumber
            }))
        })
        toast.success("Marcação realizada com sucesso!", {position: 'bottom-center'})
        router.push('/');
    }

    const dateTime = new Date(searchParams.get('dateTime') as string)
    return ( <div className="container mx-auto p-5 lg:max-w-[600px]">
        <h1 className="font-bold text-xl text-primaryDarker">Sua marcação</h1>
        <div className="flex flex-col p-5 mt-5 border-primary border-solid border shadow-lg rounded-lg bg-primaryLighter ">
            <div className="flex items-center gap-3 pb-5 border-b border-primary border-solid justify-center">
                <div className="flex flex-col gap-3 mt-2 justify-center">
                    <h2 className='text-xl text-primaryDarker font-semibold'>{dateTime.toUTCString().split(':00 GMT')}</h2>
                    <h2 className='text-xl text-primaryDarker font-sm '>Barbeiro: {barber?.name}</h2>
                    <h2 className='text-xl text-primaryDarker font-sm'>Cliente: {client}</h2>
                </div>
            </div>
        </div>
        <div className="flex flex-col mt-5 text-primaryDarker">
        <Button className="mt-1" onClick={handleFinishClick}>
          Finalizar Marcação
        </Button>
      </div>
    </div> );
}
 
export default ScheduleConfirmation;