'use client';

import { HTMLAttributes, JSX } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const links = [
    { title: 'Profile', href: '/user/profile' },
    { title: 'Orders', href: '/user/orders' },
];

function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>): JSX.Element { //(1)
    const pathname = usePathname();

    return (
        <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props } >
            {
                links.map(function (item) {
                    return (
                        <Link key={item.href} href={item.href} className={cn('text-sm font-medium transition-colors hover:text-primary', pathname.includes(item.href) ? '' : 'text-muted-foreground')} >
                            {item.title}
                        </Link>
                    )
                })
            }
        </nav>
    );
};

export default MainNav;

//(1)
// The "className" variable in this case is equal to "mx-6". This value comes from the layout.tsx ---> cn("flex items-center space-x-4", "mx-6")

// As for "...props ", You're using object destructuring to extract className and collect the rest of the props into a variable called "props". So if you write:
//                                                                <MainNav className="mx-6" id="main-nav" aria-label="Main navigation" />
// Then inside your component:
//                                                                <nav class="flex items-center space-x-4 mx-6" id="main-nav" aria-label="Main navigation">