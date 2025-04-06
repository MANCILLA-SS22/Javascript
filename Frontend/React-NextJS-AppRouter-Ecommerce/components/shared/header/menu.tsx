import { Button } from "@/components/ui/button";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import UserButton from "./user-button";

function Menu() {
    return (
        <div className="flex justify-end gap-3">
            <nav className="hidden md:flex w-full max-w-xs gap-1" > {/* (2) */}
                <ModeToggle />
                <Button asChild variant='ghost'>
                    <Link href='/cart'>
                        <ShoppingCart /> Cart
                    </Link>
                </Button>
                <UserButton />
            </nav>
            <nav className='md:hidden'> {/* (1) */}
                <Sheet>
                    <SheetTrigger className='align-middle'>
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent className='flex flex-col items-start'>
                        <SheetTitle>Menu</SheetTitle>
                        <ModeToggle />
                        <Button asChild variant='ghost'>
                            <Link href='/cart'>
                                <ShoppingCart /> Cart
                            </Link>
                        </Button>
                        <UserButton />
                        <SheetDescription></SheetDescription>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    );
}

export default Menu;

//(1) Mobile Navigation (md:hidden)
// This means that this navigation menu will only be visible on small screens(mobile devices) and hidden on medium and larger screens.
// On small screens(mobile), a menu button(EllipsisVertical) opens a sidebar(Sheet).
// hidden: This hides the element by setting display: none;.
// md:: This is a Tailwind CSS responsive breakpoint that appl ies styles at md(medium) screen sizes and above.
// md:hidden: This means hide this element when the screen is medium(md) or larger.

//(2) Desktop Navigation (md:flex)
// On larger screens, the full nav with buttons(ModeToggle, Cart, Sign In) is shown.
// hidden: Hides this nav by default (on small screens).
// md:flex: Makes it visible on medium and larger screens(by applying display: flex).