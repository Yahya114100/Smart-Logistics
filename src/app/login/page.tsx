"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Lock, ShieldCheck, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
            {/* Left Side - Branding Panel */}
            <div className="hidden bg-[#0A2540] relative lg:flex flex-col justify-between p-12 text-white overflow-hidden">
                {/* Abstract Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                }}></div>

                {/* Logo at top */}
                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-[#00D4FF] text-[#0A2540]">
                            <Plus className="h-6 w-6" strokeWidth={3} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">
                            NERVIQS
                        </span>
                    </Link>
                </div>

                {/* Centered tagline */}
                <div className="relative z-10 text-center">
                    <h2 className="text-5xl font-bold leading-tight max-w-md mx-auto">
                        Secure, Predictive Supply Chain Intelligence for the Medical Industry.
                    </h2>
                </div>

                {/* Badges at bottom */}
                <div className="relative z-10 flex gap-6">
                    <div className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 bg-white/5 backdrop-blur-sm">
                        <ShieldCheck className="h-5 w-5 text-[#00E676]" />
                        <span className="text-sm font-medium">HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 bg-white/5 backdrop-blur-sm">
                        <Lock className="h-5 w-5 text-[#00D4FF]" />
                        <span className="text-sm font-medium">End-to-End Encrypted</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center py-12 px-4 bg-background dark:bg-slate-950/50">
                <div className="mx-auto grid w-full max-w-[400px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Welcome Back</h1>
                        <p className="text-muted-foreground">
                            Enter your corporate credentials to access the secure dashboard.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Corporate Email <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@nerviqs.med"
                                defaultValue="admin@nerviqs.med"
                                className="bg-muted/50"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                                <Link
                                    href="/forgot-password"
                                    className="ml-auto text-sm underline-offset-4 hover:underline text-primary"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="bg-muted/50 pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span className="sr-only">Toggle password visibility</span>
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Remember for 30 days
                            </Label>
                        </div>

                        <Link href="/dashboard" className="w-full">
                            <Button className="w-full bg-[#0A2540] hover:bg-[#0A2540]/90 text-white dark:bg-[#00D4FF] dark:text-[#0A2540] font-bold h-11">
                                Secure Login
                                <Lock className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline hover:text-primary">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
