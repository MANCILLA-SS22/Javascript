import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/actions/cart.actions";
import { signOutUser } from "@/lib/actions/user.actions";
import { UserIcon } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";

async function UserButton() {
    const session: Session | null = await getSession();

    if(!session){
        return (
            <Button asChild>
                <Link href='/sign-in'>
                    <UserIcon /> Sign In
                </Link>
            </Button>
        )
    }

    const firstInitial: string = session.user?.name?.charAt(0).toUpperCase() ?? "👻"; //If "user" is undefined, then it's going to be undefined rather thatn throw an error.

    return (
        <div className='flex gap-2 items-center'>
            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <div className='flex items-center'>
                        <Button variant='ghost' className='relativee w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200'>{firstInitial}</Button>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className='w-56' align='end' forceMount>                    
                    <DropdownMenuLabel className='font-normal'>
                        <div className='flex flex-col space-y-1'>
                            <div className='text-sm font-medium leading-none'>
                                {session.user?.name}
                            </div>
                            <div className='text-sm text-muted-foreground leading-none'>
                                {session.user?.email}
                            </div>
                        </div>
                    </DropdownMenuLabel>

                    <DropdownMenuItem className='p-0 mb-1'>
                        <form action={signOutUser} className='w-full'>
                            <Button className='w-full py-4 px-2 h-4 justify-start' variant='ghost'>Sign Out</Button>
                        </form>
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    );
}

export default UserButton;