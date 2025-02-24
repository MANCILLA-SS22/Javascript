import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";

function Header() {
    return (
        <header>
            <div className="wrapper flex-between">
                <div className="flex-start">
                    <Link href="/" className='flex-start'>
                        <Image src="/images/logo.svg" alt={`${APP_NAME} logo`} height={48} width={48} priority={true} />
                        <span className="hissen lg:block font-bold text-2xl ml-3">{APP_NAME}</span>
                    </Link>
                </div>
                <Menu />
            </div>
        </header>
    );
}

export default Header;