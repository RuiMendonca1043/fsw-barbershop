'use client'
import { Barber } from '@prisma/client';
import Button from '@/components/Button';
import DatePicker from "@/components/DatePicker";
import { Controller, useForm } from 'react-hook-form';
import Input from '@/components/Input';
import { useRouter } from "next/navigation";

interface SchedulingForm {
    dateTime: Date | null;
    name: string;
    phoneNumber: string;
}
interface BarberReservationProps {
    barber: Barber | null;
    dates: Date[];
}


const BarberReservation = ({barber, dates}:BarberReservationProps) => {
    const { register, handleSubmit, formState: {errors}, control, watch, setError } = useForm<SchedulingForm>();
    const router = useRouter();
    const onSubmit = async (data:SchedulingForm)=>{
        
        const response = await fetch('http://localhost:3000/api/barber/check', {
            method: 'POST',
            body: Buffer.from(
                JSON.stringify({
                    barberId: barber?.id,
                    dateTime: data.dateTime
                })
            )
        });
        const res = await response.json();
        

        if(res?.error?.code === 'BARBER_ALREADY_RESERVED' 
        || res?.error?.code === 'LESS_THAN_24_HOURS' 
        || res?.error?.code==='OUTSIDE_WORKING_HOURS'){
            setError('dateTime', {
                type: 'manual',
                message: 'Este horário já esta reservado.'
            })
        }else{
            setTimeout(() => {
            router.push(
                `/scheduling/${barber?.id}/confirmation?dateTime=${data.dateTime}&name=${data.name}&phoneNumber=${data.phoneNumber}`
            );
        }, 5000);
        }
    
    };
    const launchTime = [
        new Date(0, 0, 0, 12, 30), // 12:30
        new Date(0, 0, 0, 13, 0),  // 13:00
        new Date(0, 0, 0, 13, 30)  // 13:30
    ];   
    const date = watch('dateTime');
    return (
        <div className='flex flex-col p-5'>
            <div className='flex justify-center gap-4'>
                <Controller
                    name="dateTime"
                    rules={{
                        required: {
                            value: true,
                            message: "Data e Hora são obrigatórios."
                        },
                    }}
                    control={control}
                    render={({ field }) => 
                        <DatePicker 
                            error={!!errors?.dateTime} errorMessage={errors?.dateTime?.message}
                            onChange={field.onChange} 
                            selected={field.value}
                            filterDate={(field)=> (field.getDay() !== barber?.dayOff) && (field.getDay() !== 0)}
                            minDate={new Date()}
                            //excludeDates={exDates}
                            
                            excludeTimes={launchTime}
                            minTime={barber?.startTime}
                            maxTime={barber?.endTime}
                            placeholderText="Data e Hora"
                            className='w-full'
                        />}
                />
                
            </div>
            <Input 
                {...register("name", {
                    required: {
                      value: true,
                      message: "Nome do cliente é obrigatório.",
                    },
                  })}
                  placeholder={`Nome do cliente`}
                  className="mt-4"
                  error={!!errors?.name}
                  errorMessage={errors?.name?.message}
                  type="string"
            />
            <Input 
                {...register("phoneNumber", {
                    required: {
                      value: false,
                      message: "Número de telefone.",
                    },
                    max: {
                      value: 969999999,
                      message: `Número de telemóvel tem de ser válido.`,
                    },
                    min: {
                        value: 910000000,
                        message: `Número de telemóvel tem de ser válido.`,
                    }
                  })}
                  placeholder={`Número de telemóvel`}
                  className="mt-4"
                  error={!!errors?.phoneNumber}
                  errorMessage={errors?.phoneNumber?.message}
                  type="string"
            />
            <div className='flex justify-center px-10'>
                <Button onClick={()=>handleSubmit(onSubmit)()} className='mt-4'>Marcar agora</Button>
            </div>
        </div>
    );
}
 
export default BarberReservation;