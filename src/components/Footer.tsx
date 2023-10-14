import Link from "next/link";

const Footer = () => {
    return (
        <div className="mt-7 p-5 flex flex-col justify-center items-center gap-2 border-y border-y-primary">
            <div className="flex gap-1">
                <p className="text-primaryDarker text-xs">Localização: </p>
                <Link href='https://www.google.com/maps/place/REAL+Barbearia+-+Nuno+Marinho/@41.2488292,-8.3310544,12z/data=!4m10!1m2!2m1!1sRua+dos+Balanceiros,+n%C2%BA202,+Loja+B,+Vila+Me%C3%A3,+Portugal!3m6!1s0xd2495fbf15765e9:0xf4eb0ccb30839e07!8m2!3d41.2488292!4d-8.1786191!15sCjhSdWEgZG9zIEJhbGFuY2Vpcm9zLCBuwroyMDIsIExvamEgQiwgVmlsYSBNZcOjLCBQb3J0dWdhbJIBC2JhcmJlcl9zaG9w4AEA!16s%2Fg%2F11h6db8kq_?entry=ttu'>
                    <p className="text-dark text-xs underline">Rua dos Balanceiros, nº202, Loja B, Vila Meã, Portugal</p>
                </Link>
            </div>
            <div className="flex gap-1">
                <p className="text-primaryDarker text-xs">Telefone: </p>
                <p className="text-dark text-xs">916 803 067</p>
            </div>
            <div className="flex gap-1">
                <p className="text-primaryDarker text-xs">Email: </p>
                <p className="text-dark text-xs">realbarbearia.nm@gmail.com</p>
            </div>
        </div>
    );
}
 
export default Footer;