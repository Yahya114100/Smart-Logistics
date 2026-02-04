"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard, Truck, Radio, Bell, FileBarChart, User, LogOut, Settings, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SIDEBAR_ITEMS = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/shipments", label: "Shipments", icon: Truck },
    { href: "/sensors", label: "Sensors (IoT)", icon: Radio },
    { href: "/alerts", label: "Alerts", icon: Bell, badge: 3 },
    { href: "/reports", label: "Reports", icon: FileBarChart },
    { href: "#", label: "AI Assistant", icon: Bot },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="hidden border-r bg-sidebar md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-50">
            {/* Sidebar Header */}
            <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                        <Plus className="h-5 w-5" strokeWidth={3} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-sidebar-foreground">
                        NERVIQS
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="grid gap-1 px-2">
                    {SIDEBAR_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);

                        if (item.label === "AI Assistant") {
                            return (
                                <button
                                    key={index}
                                    onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer text-muted-foreground"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span className="flex-1 text-left">{item.label}</span>
                                    {item.badge && (
                                        <Badge variant="destructive" className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </button>
                            )
                        }

                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer",
                                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                    <Badge variant="destructive" className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]">
                                        {item.badge}
                                    </Badge>
                                )}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-sidebar-border p-4">
                <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/50 p-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="truncate text-sm font-semibold text-sidebar-foreground">Admin User</span>
                        <span className="truncate text-xs text-muted-foreground">Central Ops</span>
                    </div>
                </div>
                <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </Link>
            </div>
        </div>
    );
}
