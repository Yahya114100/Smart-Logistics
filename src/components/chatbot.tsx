"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send, X, Bot, Sparkles, AlertTriangle, Volume2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
    role: "user" | "assistant";
    content: string;
    isStreaming?: boolean;
}

const SUGGESTIONS = [
    "إيه الأدوية اللي هتخلص قريب؟",
    "What is the status of shipment PH-9921?",
    "Give me a summary of risks",
    "كيف يمكن تقليل الهدر؟"
];

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [scrollAreaRef, setScrollAreaRef] = useState<HTMLDivElement | null>(null);
    const [voiceActive, setVoiceActive] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load initial voice setting
        const savedVoice = localStorage.getItem("voice_enabled");
        setVoiceActive(savedVoice === "true");

        // Listen for custom events
        const handleOpen = () => setIsOpen(true);
        const handleClear = () => setMessages([]);
        const handleVoiceUpdate = () => {
            const updatedVoice = localStorage.getItem("voice_enabled");
            setVoiceActive(updatedVoice === "true");
        };

        window.addEventListener("open-chatbot", handleOpen);
        window.addEventListener("clear-chat-history", handleClear);
        window.addEventListener("voice-settings-changed", handleVoiceUpdate);

        return () => {
            window.removeEventListener("open-chatbot", handleOpen);
            window.removeEventListener("clear-chat-history", handleClear);
            window.removeEventListener("voice-settings-changed", handleVoiceUpdate);
        };
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const streamResponse = async (text: string) => {
        setIsTyping(true);
        // Simulate thinking delay
        await new Promise(r => setTimeout(r, 800));
        setIsTyping(false);

        const newMessage: Message = { role: "assistant", content: "", isStreaming: true };
        setMessages(prev => [...prev, newMessage]);

        // Stream text character by character
        for (let i = 0; i < text.length; i++) {
            await new Promise(r => setTimeout(r, 15));
            setMessages(prev => {
                const newArr = [...prev];
                const last = newArr[newArr.length - 1];
                last.content = text.substring(0, i + 1);
                return newArr;
            });
        }

        // Finalize
        setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1].isStreaming = false;
            return newArr;
        });
    };

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: "user", content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        // Mock Intelligence Logic
        const lower = text.toLowerCase();

        if (lower.includes("تخلص") || lower.includes("هتخلص") || lower.includes("expiry") || lower.includes("finish")) {
            await streamResponse("البارد والإنفلونزا (Cold & Flu) متبقي منه مخزون يكفي 12 يوماً فقط. \n\nالتوصية: زيادة الإنتاج فوراً بنسبة 30% لتجنب النقص المتوقع.");
        }
        else if (lower.includes("9921") || lower.includes("شحنة")) {
            await streamResponse("Shipment PH-9921-X is currently at **Critical Risk**.\n\nTemperature: 8.5°C (Threshold: 8.0°C)\nIssue: Compressor failure detected 10 mins ago.\nAction: Driver notified to switch to backup cooling.");
        }
        else if (lower.includes("summary") || lower.includes("ملخص")) {
            await streamResponse("Here is your Dashboard Summary:\n• 3 Active Alerts (1 Critical)\n• Warehouse Temp: Stable at 4.8°C\n• Efficiency: 94% (+2% vs last week)\n\nAttention needed: Loading Dock humidity is rising.");
        }
        else if (lower.includes("هدر") || lower.includes("waste")) {
            await streamResponse("لتقليل الهدر، أقترح:\n1. نقل المنتجات قريبة انتهاء الصلاحية إلى مناطق التوزيع الأعلى طلباً.\n2. صيانة دورية لمستشعرات المنطقة 4 (Freezer Unit).\n3. تفعيل التنبيه المبكر عند انحراف الحرارة بمقدار 0.5 درجة.");
        }
        else {
            // Fallback for generic inputs
            const isArabic = /[\u0600-\u06FF]/.test(text);
            if (isArabic) {
                await streamResponse("أنا مساعد ذكي تجريبي. يمكنني الإجابة عن حالة الشحنات، التنبيهات، ومستويات المخزون. جرب أن تسألني عن 'الشحنات الخطرة'.");
            } else {
                await streamResponse("I am a demo assistant using simulated data. I can help with predictive analytics, shipment tracking, and risk assessment. Try asking about 'Alerts'.");
            }
        }
    };

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button
                    className="h-14 w-14 rounded-full bg-[#00D4FF] hover:bg-[#00D4FF]/90 shadow-[0_0_20px_rgba(0,212,255,0.5)] flex items-center justify-center p-0 animate-pulse-slow transition-transform hover:scale-105 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <Bot className="h-8 w-8 text-[#0A2540] fill-current" />
                </Button>
            </div>

            {/* Drawer */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent className="w-[400px] sm:w-[440px] border-l border-[#00D4FF]/20 bg-background/95 backdrop-blur-xl p-0 flex flex-col shadow-2xl">
                    <SheetHeader className="p-4 border-b border-border bg-muted/20">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-2 w-2 absolute bottom-0 right-0 bg-green-500 rounded-full ring-2 ring-background"></div>
                                <div className="h-10 w-10 rounded-lg bg-[#00D4FF] flex items-center justify-center">
                                    <Bot className="h-6 w-6 text-[#0A2540]" />
                                </div>
                            </div>
                            <div className="text-left">
                                <SheetTitle className="text-lg font-bold flex items-center gap-2">
                                    NERVIQS AI
                                    <span className="text-[10px] bg-[#00D4FF]/20 text-[#00D4FF] px-2 py-0.5 rounded-full border border-[#00D4FF]/30">DEMO</span>
                                    {voiceActive && <Volume2 className="h-4 w-4 text-[#00D4FF] animate-pulse" />}
                                </SheetTitle>
                                <p className="text-xs text-muted-foreground">Predictive Logistics Assistant</p>
                            </div>
                        </div>
                    </SheetHeader>

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                        <div className="space-y-4 pb-4">
                            {/* Welcome Message */}
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8 mt-1 border border-[#00D4FF]/30">
                                    <AvatarFallback className="bg-[#00D4FF] text-[#0A2540]"><Bot className="h-5 w-5" /></AvatarFallback>
                                </Avatar>
                                <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm">
                                    <p>Hello! I analyze your supply chain data in real-time. How can I help you prevent waste today?</p>
                                </div>
                            </div>

                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    {msg.role === 'assistant' && (
                                        <Avatar className="h-8 w-8 mt-1 border border-[#00D4FF]/30">
                                            <AvatarFallback className="bg-[#00D4FF] text-[#0A2540]"><Bot className="h-5 w-5" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    {msg.role === 'user' && (
                                        <Avatar className="h-8 w-8 mt-1 border border-primary/30">
                                            <AvatarImage src="/avatars/01.png" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`p-3 rounded-2xl max-w-[85%] text-sm whitespace-pre-line shadow-sm
                                ${msg.role === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                                            : 'bg-muted/50 rounded-tl-none border border-border/50'
                                        }
                            `}>
                                        {msg.content}
                                        {msg.isStreaming && <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-[#00D4FF] animate-pulse" />}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex gap-3">
                                    <Avatar className="h-8 w-8 mt-1 border border-[#00D4FF]/30">
                                        <AvatarFallback className="bg-[#00D4FF] text-[#0A2540]"><Bot className="h-5 w-5" /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-none text-sm flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    {/* Suggestions */}
                    {messages.length === 0 && (
                        <div className="px-4 pb-2">
                            <p className="text-xs text-muted-foreground mb-2 font-medium">Suggested queries:</p>
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTIONS.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(s)}
                                        className="text-xs bg-muted hover:bg-muted/80 border border-border px-3 py-1.5 rounded-full transition-colors text-left"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 border-t border-border bg-background">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                            <Input
                                placeholder="Ask about shipments, expiry, or risks..."
                                className="flex-1 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-[#00D4FF]"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <Button type="submit" size="icon" disabled={!input.trim()} className="bg-[#00D4FF] text-[#0A2540] hover:bg-[#00D4FF]/90">
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                        <p className="text-[10px] text-center text-muted-foreground mt-2">
                            AI can make mistakes. Demo Version v1.0
                        </p>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
