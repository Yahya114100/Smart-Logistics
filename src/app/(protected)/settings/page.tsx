"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Check, User, Bell, LayoutDashboard, AlertTriangle, Palette, HelpCircle, Bot, Mail, MessageSquare } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const { setTheme } = useTheme();

    // Settings States
    const [dashboardView, setDashboardView] = useState("overview");
    const [email, setEmail] = useState("admin@nerviqs.med");
    const [name, setName] = useState("Admin User");
    const [phone, setPhone] = useState("+1 (555) 000-0000");
    const [voiceEnabled, setVoiceEnabled] = useState(false);

    // Load persistence on mount
    useEffect(() => {
        const savedView = localStorage.getItem("dashboard_view");
        if (savedView) setDashboardView(savedView);
        const savedVoice = localStorage.getItem("voice_enabled");
        if (savedVoice) setVoiceEnabled(savedVoice === "true");
    }, []);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call and LocalStorage save
        localStorage.setItem("dashboard_view", dashboardView);
        localStorage.setItem("voice_enabled", String(voiceEnabled));

        setTimeout(() => {
            setLoading(false);
            toast.success("Settings saved successfully.", {
                description: "Your preferences including voice settings have been updated."
            });
        }, 800);
    };

    const handleContactBot = () => {
        // This will be caught by the Chatbot component event listener or handled via global state if we had it. 
        // For now, we will dispatch a custom event that the Chatbot listens to.
        window.dispatchEvent(new Event("open-chatbot"));
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <Button onClick={handleSave} disabled={loading} className="bg-primary text-primary-foreground">
                    {loading ? "Saving..." : "Save Changes"}
                </Button>
            </div>

            <Tabs defaultValue="profile" orientation="vertical" className="flex flex-col md:flex-row gap-6">
                <aside className="w-full md:w-64 shrink-0">
                    <TabsList className="flex flex-col h-auto items-stretch bg-muted/50 p-1 space-y-1">
                        <TabsTrigger value="profile" className="justify-start px-4 py-3"><User className="mr-2 h-4 w-4" /> Profile</TabsTrigger>
                        <TabsTrigger value="notifications" className="justify-start px-4 py-3"><Bell className="mr-2 h-4 w-4" /> Notifications</TabsTrigger>
                        <TabsTrigger value="dashboard" className="justify-start px-4 py-3"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard Prefs</TabsTrigger>
                        <TabsTrigger value="thresholds" className="justify-start px-4 py-3"><AlertTriangle className="mr-2 h-4 w-4" /> Thresholds</TabsTrigger>
                        <TabsTrigger value="chatbot" className="justify-start px-4 py-3"><Bot className="mr-2 h-4 w-4" /> Chatbot</TabsTrigger>
                        <TabsTrigger value="appearance" className="justify-start px-4 py-3"><Palette className="mr-2 h-4 w-4" /> Appearance</TabsTrigger>
                        <TabsTrigger value="help" className="justify-start px-4 py-3"><HelpCircle className="mr-2 h-4 w-4" /> Help</TabsTrigger>
                    </TabsList>
                </aside>

                <div className="flex-1 space-y-6">
                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-4 m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Manage your public profile and contact details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6">
                                    <Avatar className="h-20 w-20 border-2 border-primary/20 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => toast("Upload Photo", { description: "File picker would open here." })}>
                                        <AvatarImage src="/avatars/01.png" />
                                        <AvatarFallback className="text-lg">AD</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline" size="sm" onClick={() => toast("Upload Photo", { description: "File picker would open here." })}>Change Avatar</Button>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Language</Label>
                                        <Select defaultValue="en">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English (US)</SelectItem>
                                                <SelectItem value="ar">Arabic</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab - Kept Simplified */}
                    <TabsContent value="notifications" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Alert Preferences</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between py-2">
                                    <Label>Temperature Deviations</Label>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <Label>Predicted Delays</Label>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Dashboard Prefs */}
                    <TabsContent value="dashboard" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Dashboard Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Default View</Label>
                                        <Select value={dashboardView} onValueChange={setDashboardView}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="overview">Overview</SelectItem>
                                                <SelectItem value="map">Map View</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-muted-foreground">Select your preferred starting view.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Temperature Unit</Label>
                                        <Select defaultValue="c">
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="c">Celsius (°C)</SelectItem>
                                                <SelectItem value="f">Fahrenheit (°F)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Chatbot Config */}
                    <TabsContent value="chatbot" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>AI Assistant Configuration</CardTitle>
                                <CardDescription>Customize the behavior of NERVIQS AI.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Auto-Open on Alert</Label>
                                        <p className="text-sm text-muted-foreground">Assistant pops up when critical risks are detected.</p>
                                    </div>
                                    <Switch defaultChecked className="cursor-pointer" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Voice Response (Experimental)</Label>
                                        <p className="text-sm text-muted-foreground">Allow the assistant to speak answers.</p>
                                    </div>
                                    <Switch
                                        checked={voiceEnabled}
                                        onCheckedChange={(checked) => {
                                            setVoiceEnabled(checked);
                                            localStorage.setItem("voice_enabled", String(checked));
                                            window.dispatchEvent(new Event("voice-settings-changed"));
                                        }}
                                        className="cursor-pointer"
                                    />
                                </div>
                                <Button
                                    variant="destructive"
                                    className="w-full cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => {
                                        window.dispatchEvent(new Event("clear-chat-history"));
                                        toast.success("Chat history cleared");
                                    }}
                                >
                                    Clear Conversation History
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Thresholds */}
                    <TabsContent value="thresholds" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monitoring Thresholds</CardTitle>
                                <CardDescription className="text-warning">Note: Demo overrides only.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Temperature Alert Limit (±{2.0}°C)</Label>
                                    </div>
                                    <Input type="range" min="0.5" max="5.0" step="0.5" defaultValue="2.0" />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance */}
                    <TabsContent value="appearance" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Theme Mode</Label>
                                        <p className="text-sm text-muted-foreground">Select your preferred interface theme.</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => setTheme("dark")}>Dark</Button>
                                        <Button variant="outline" size="sm" onClick={() => setTheme("light")}>Light</Button>
                                        <Button variant="secondary" size="sm" onClick={() => setTheme("system")}>System</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Help */}
                    <TabsContent value="help" className="m-0">
                        <Card>
                            <CardHeader>
                                <CardTitle>Support & Documentation</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <Link href="/contact" className="w-full">
                                    <Button variant="outline" className="w-full justify-start h-12">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Contact with Team
                                    </Button>
                                </Link>
                                <Button variant="outline" className="w-full justify-start h-12 bg-[#00D4FF]/10 hover:bg-[#00D4FF]/20 border-[#00D4FF]/50 text-[#00D4FF]" onClick={handleContactBot}>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Contact with Bot
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

