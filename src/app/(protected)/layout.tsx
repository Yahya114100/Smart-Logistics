"use client";

import { Bell, Search, Settings, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sidebar } from "@/components/layout/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Chatbot } from "@/components/chatbot";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const handleNotificationClick = () => {
        toast("Notifications", {
            description: "You have 3 critical alerts requiring attention.",
            action: {
                label: "View",
                onClick: () => router.push("/alerts")
            },
        });
    };

    const handleSettingsClick = () => {
        toast.info("Settings", {
            description: "Global system settings panel would open here."
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="flex min-h-screen flex-col md:pl-64 transition-all duration-300">
                <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur-md">
                    <div className="flex flex-1 items-center gap-4 md:gap-8">
                        <form className="flex-1 md:w-auto md:flex-none">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search shipments..."
                                    className="h-9 md:w-[300px] lg:w-[400px] pl-8 bg-muted/50"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground" onClick={() => router.push("/alerts")}>
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
                            <span className="sr-only">Notifications</span>
                        </Button>

                        <ModeToggle />

                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => router.push("/settings")}>
                            <Settings className="h-5 w-5" />
                            <span className="sr-only">Settings</span>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full ml-2">
                                    <Avatar className="h-9 w-9 border border-border">
                                        <AvatarImage src="/avatars/01.png" alt="@admin" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">Admin User</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            admin@nerviqs.med
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast("Profile", { description: "User profile details." })}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast("Billing", { description: "Billing information." })}>
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/settings")}>
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => router.push("/login")}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
            <Chatbot />
        </div>
    );
}
