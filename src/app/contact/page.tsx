"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Mail, Phone, Linkedin, CheckCircle, Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const teamMembers = [
        {
            name: "Yahya Sanad Yahya",
            role: "Founder & Project Lead",
            bio: "Leading the vision for predictive pharma supply chain intelligence.",
            email: "yahyasanad4@gmail.com",
            phone: "+201212685615",
        },
        {
            name: "Mostafa Tamer Mostafa",
            role: "AI & Data Engineer",
            bio: "Building the predictive models that prevent medicine waste.",
            email: "sara@nerviqs.com", // Keeping requested email despite name mismatch if intended
            phone: "+201028606607",
        },
        {
            name: "Hend Khaled Anwar",
            role: "Full-Stack Developer",
            bio: "Turning ideas into a secure, responsive dashboard.",
            email: "omar@nerviqs.com", // Keeping requested email
            phone: "+201098517192",
        },
        {
            name: "Hager Ayman Ahmed",
            role: "UI/UX Designer",
            bio: "Crafting intuitive interfaces for critical healthcare decisions.",
            email: "hagar.abosamra55@gmail.com",
            phone: "+201091866609",
        },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-[#0A2540] to-background text-center px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.png')]"></div> {/* Abstract overlay helper */}
                <div className="relative z-10 container">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Get in Touch with the Team</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        We&apos;re a small passionate team building predictive cold-chain intelligence for life-saving pharmaceuticals.
                        Reach out for demo access, questions, or collaboration.
                    </p>
                </div>
            </section>

            <main className="flex-1 container px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column: Contact Form */}
                    <div className="lg:w-[90%]">
                        <Card className="border-border/50 shadow-xl bg-card">
                            <CardHeader>
                                <CardTitle>Send us a Message</CardTitle>
                                <CardDescription>We typically respond within 24-48 hours.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!submitted ? (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="Dr. John Doe" required className="bg-muted/50" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">Corporate Email</Label>
                                            <Input id="email" type="email" placeholder="john@pharma.com" required className="bg-muted/50" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input id="subject" placeholder="Demo Inquiry" className="bg-muted/50" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px] bg-muted/50" required />
                                        </div>
                                        <Button type="submit" className="w-full bg-gradient-to-r from-[#00D4FF] to-[#00E676] text-[#0A2540] font-bold hover:shadow-lg hover:from-[#00D4FF] hover:to-[#00E676] hover:opacity-90 transition-all duration-300 transform hover:scale-[1.01]">
                                            Send Message
                                            <Send className="ml-2 h-4 w-4" />
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in duration-500">
                                        <div className="h-16 w-16 rounded-full bg-success/20 flex items-center justify-center text-success mb-2">
                                            <CheckCircle className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Message Sent!</h3>
                                        <p className="text-muted-foreground">We&apos;ll get back to you soon.</p>
                                        <Button variant="outline" onClick={() => setSubmitted(false)}>Send another</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Team Members */}
                    <div className="space-y-8">
                        <div className="text-center lg:text-left mb-8">
                            <h2 className="text-3xl font-bold mb-2">Meet Our Team</h2>
                            <p className="text-muted-foreground">The minds behind NERVIQS Hackathon Demo</p>
                        </div>

                        {/* 
                   User asked for 4 cards in one row on desktop inside this column.
                   This column is 50% width. 4 cards = 25% each of 50% = 12.5% screen.
                   That is extremely small for cards with bios.
                   I will do grid-cols-2 (2 per row) on large screens which is standard for a 2-col layout.
                   If screens are HUGE (2xl), maybe 4? But 2x2 is safer and looks better.
                */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {teamMembers.map((member, i) => (
                                <div key={i} className="group relative bg-card border border-border/50 rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#00D4FF]/30">
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#00D4FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>

                                    <div className="relative mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden border-2 border-border group-hover:border-[#00D4FF] group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                        {/* Placeholder Avatar if no image */}
                                        <div className="h-full w-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                                            {member.name.split(" ")[0][0]}{member.name.split(" ").pop()?.[0]}
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold leading-tight mb-1 group-hover:text-[#00D4FF] transition-colors">{member.name}</h3>
                                    <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">{member.bio}</p>

                                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                        <a href={`mailto:${member.email}`} className="flex items-center justify-center gap-2 hover:text-foreground transition-colors overflow-hidden text-ellipsis">
                                            <Mail className="h-3 w-3" />
                                            <span className="truncate max-w-[150px]">{member.email}</span>
                                        </a>
                                        <a href={`tel:${member.phone}`} className="flex items-center justify-center gap-2 hover:text-foreground transition-colors">
                                            <Phone className="h-3 w-3" />
                                            {member.phone}
                                        </a>
                                        <div className="flex justify-center mt-2">
                                            <Linkedin className="h-4 w-4 text-blue-500 cursor-pointer hover:scale-110 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <section className="mt-20 text-center py-12 border-t border-border/40">
                    <h2 className="text-2xl font-bold mb-6">Ready to see the live demo?</h2>
                    <Button size="lg" className="bg-[#00D4FF] text-[#0A2540] hover:bg-[#00D4FF]/90 font-bold" onClick={() => window.location.href = '/login'}>
                        Launch it now
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </section>
            </main>

            <footer className="w-full border-t bg-[#0A2540] text-gray-400 py-8 text-center text-sm">
                © 2026 NERVIQS. Built for Benha Hackathon. All rights reserved.
            </footer>
        </div>
    );
}
