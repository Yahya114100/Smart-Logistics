"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Lock, ShieldCheck, Check } from "lucide-react";

export default function SignupPage() {
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);

    const requirements = [
        { label: "At least 8 characters", valid: password.length >= 8 },
        { label: "Contains a number", valid: /\d/.test(password) },
        { label: "Contains a special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
        { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) }
    ];

    const isValid = requirements.every(r => r.valid);

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
                        Join the future of Intelligent Pharmaceutical Logistics.
                    </h2>
                </div>

                {/* Badge at bottom */}
                <div className="relative z-10 flex gap-6">
                    <div className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 bg-white/5 backdrop-blur-sm">
                        <ShieldCheck className="h-5 w-5 text-[#00E676]" />
                        <span className="text-sm font-medium">HIPAA Compliant</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex items-center justify-center py-12 px-4 bg-background dark:bg-slate-950/50">
                <div className="mx-auto grid w-full max-w-[400px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Create an Account</h1>
                        <p className="text-muted-foreground">
                            Enter your details to request platform access.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name <span className="text-red-500">*</span></Label>
                                <Input id="first-name" placeholder="John" required className="bg-muted/50" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name <span className="text-red-500">*</span></Label>
                                <Input id="last-name" placeholder="Doe" required className="bg-muted/50" />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Work Email <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                className="bg-muted/50"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                className="bg-muted/50"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setTouched(true);
                                }}
                            />
                            {/* Password Strength Indicators */}
                            {touched && (
                                <div className="space-y-1 mt-1 transition-all duration-300">
                                    <p className="text-xs font-semibold mb-1">Password Requirements:</p>
                                    <ul className="text-xs space-y-1">
                                        {requirements.map((req, i) => (
                                            <li key={i} className={`flex items-center gap-1.5 ${req.valid ? 'text-green-500' : 'text-muted-foreground'}`}>
                                                {req.valid ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                                                {req.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <Link href={isValid ? "/dashboard" : "#"} className="w-full" onClick={(e) => !isValid && e.preventDefault()}>
                            <Button
                                className="w-full bg-[#0A2540] hover:bg-[#0A2540]/90 text-white dark:bg-[#00D4FF] dark:text-[#0A2540] font-bold h-11 transition-opacity"
                                disabled={!isValid}
                            >
                                Create Account
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline hover:text-primary">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

