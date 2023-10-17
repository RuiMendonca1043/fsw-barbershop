import { Barber } from "@prisma/client";
import Image from "next/image"
import Link from "next/link";

interface BarberItemProps {
    id: string;
    name: string;
}

const _BarberItem = ({id,name}:BarberItemProps) => {
    return ( 
        <Link href={`/teste/scheduling/${id}`}>
            <div className="flex flex-col items-center justify-center bg-white w-[350px] h-[100px] 
            border border-primary rounded-lg">
                <Image src='/perfil.png' width={40} height={40} alt="perfil"/>
                <h3>{name}</h3>
            </div> 
        </Link>
    );
}
 
export default _BarberItem;