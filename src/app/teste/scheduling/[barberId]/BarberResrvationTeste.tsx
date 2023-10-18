'use client'
import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { Controller,useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

interface BarberReservationProps {
    barberId: string;
    dayOff: number;
}
interface BarberReservationForm {
    name: string;
    phoneNumber: string;
    day: Date | null;
    hour: string;
}

const BarberReservation = ({barberId,dayOff}:BarberReservationProps) => {
    const {
        register,
        handleSubmit,
        formState:{errors},
        control,
        watch,
        setError
    } = useForm<BarberReservationForm>();
    const [hours,setHours]= useState([]);
    const [time,setTime]= useState('');
    const day = watch('day');
    const router = useRouter();
    const handleSelectChange = (event:any) => {
        console.log('MUDOU')
        const selectedValue = event.target.value;
        setTime(selectedValue);
      };
    useEffect(()=>{
        const fetchHours =async (barberId:string, day: Date | null) => {
            const response = await fetch('/api/teste/availablehours',{
                method: 'POST',
                mode: 'no-cors',
                body: Buffer.from(JSON.stringify({
                    barberId,
                    day,
                }))
            });
            const data = await response.json();

            if(day)
            setHours(data.availableHours);

        };
        fetchHours(barberId,day);
    },[barberId, day]);


    const onSubmit =async (data:BarberReservationForm) => {
        console.log("OLA")
        const response = await fetch('/api/teste/schedulecheck',{
            method: 'POST',
            mode: 'no-cors',
            body: Buffer.from(JSON.stringify({
                barberId,
                day:data.day,
                hour: time
            }))
        });
        const res = await response.json();
        console.log(res)
        if (res?.error?.code === "BARBER_NOT_AVAILABLE") {
            setError("day", {
              type: "manual",
              message: "Este dia/hora já estão reservados.",
            }); 
        }
        console.log(`dia: ${data.day?.toISOString()}   hora:${time}`)
        router.push(`/teste/scheduling/${barberId}/confirmation?day=${data.day?.toISOString()}&hour=${time}&name=${data.name}&phoneNumber=${data.phoneNumber}`)
    }    
    
    return <div className='flex flex-col p-5'>
    <div className='flex justify-center gap-4'>
        <Controller 
            name="day"
            rules={{
                required: {
                    value: true,
                    message: "Data é obrigatória."
                },
            }}
            control={control}
            render={({field})=>(
                <DateTimePicker 
                    error={!!errors?.day}
                    errorMessage={errors?.day?.message}
                    onChange={field.onChange}
                    selected={field.value}
                    placeholderText="Data"
                    className="w-full"
                    minDate={new Date()}
                />
            )}
        />
        <select className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary"
                onChange={handleSelectChange} value={time}>
            {hours.map((h)=>(
                <option key={h} value={h}>{h}</option>
            ))}
        </select>
        
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
              value: true,
              message: "Número de telefone é obrigatório.",
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

}
 
export default BarberReservation;