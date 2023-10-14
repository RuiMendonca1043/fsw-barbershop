'use client'
import Image from 'next/image'
import Link from 'next/link';


const Header = () => {
    return ( 
        <div className="container mx-auto p-4 flex items-center justify-center ">
            <Link href='/'>
                <Image width={100} height={100} src='/icon.png' alt='logo'></Image>
            </Link>
        </div> 
    );
}
 
export default Header;