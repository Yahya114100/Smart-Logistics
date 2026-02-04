"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ArrowLeft, Mail, CheckCircle, Lock } from "lucide-react";

export default function ForgotPasswordPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
            {/* Left Side */}
            <div className="hidden bg-[#0A2540] relative lg:flex flex-col justify-between p-12 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "30px 30px"
                }}></div>

                {/* Logo at top-left */}
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

                {/* Centered broken lock and message */}
                <div className="relative z-10 text-center space-y-6">
                    {/* Large Broken Lock Icon */}
                    <div className="flex justify-center">
                        <div className="relative">
                            <Lock className="h-32 w-32 text-red-500/80" strokeWidth={1.5} />
                            {/* Diagonal line through lock to show it's broken */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-1 w-40 bg-red-500 rotate-45"></div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold">You loss your password !!</h2>


                </div>

                {/* Empty spacer for bottom */}
                <div className="relative z-10"></div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-center py-12 px-4 bg-background dark:bg-slate-950/50">
                <div className="mx-auto grid w-full max-w-[400px] gap-6">
                    {!isSubmitted ? (
                        <>
                            <div className="grid gap-2 text-center">
                                <h1 className="text-3xl font-bold">Reset Password</h1>
                                <p className="text-muted-foreground">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        className="bg-muted/50"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-[#0A2540] hover:bg-[#0A2540]/90 text-white dark:bg-[#00D4FF] dark:text-[#0A2540] font-bold h-11">
                                    Send Reset Link
                                    <Mail className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex justify-center">
                                <CheckCircle className="h-16 w-16 text-[#00E676]" />
                            </div>
                            <h1 className="text-3xl font-bold">Check your email</h1>
                            <p className="text-muted-foreground">
                                We have sent a password reset link to your email address.
                            </p>
                            <Button variant="outline" className="w-full mt-4" onClick={() => setIsSubmitted(false)}>
                                Try another email
                            </Button>
                        </div>
                    )}

                    <div className="mt-4 text-center">
                        <Link href="/login" className="flex items-center justify-center text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
