"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Plus, Menu, X } from "lucide-react";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/demo-plan", label: "Demo Plan" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur-md bg-[#0A2540] dark:bg-background/80 supports-[backdrop-filter]:bg-[#0A2540]/90 dark:supports-[backdrop-filter]:bg-background/60 border-white/10 dark:border-border">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-[#00D4FF] text-[#0A2540]">
                        <Plus className="h-5 w-5" strokeWidth={3} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        NERVIQS
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors hover:text-[#00D4FF] ${pathname === link.href ? "text-[#00D4FF]" : "text-gray-300"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ModeToggle />
                    <Link href="/login">
                        <Button variant="ghost" className="text-white hover:text-[#00D4FF] hover:bg-white/10">
                            Log in
                        </Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="default" className="bg-[#00D4FF] text-[#0A2540] hover:bg-[#00D4FF]/90 font-bold">
                            Sign Up
                        </Button>
                    </Link>
                </div>

                {/* Mobile Nav */}
                <div className="flex md:hidden items-center gap-2">
                    <ModeToggle />
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="flex flex-col gap-4 mt-8">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-lg font-medium transition-colors hover:text-primary"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <Link href="/login" onClick={() => setIsOpen(false)}>
                                    <Button className="w-full mt-4">Login</Button>
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
