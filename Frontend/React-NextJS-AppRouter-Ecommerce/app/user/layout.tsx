import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import MainNav from "./main-nav";
import Menu from "@/components/shared/header/menu";

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className='flex flex-col'>
                <div className='border-b container mx-auto'>
                    <div className='flex items-center h-16 px-4'>
                        <Link href='/' className='w-22'>
                            <Image src='/images/logo.svg' height={48} width={48} alt={APP_NAME} />
                        </Link>
                        
                        <MainNav className='mx-6' />

                        <div className='ml-auto items-center flex space-x-4'>
                            <Menu />
                        </div>
                    </div>
                </div>

                <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
                    {children}
                </div>
            </div>
        </>
    );
}