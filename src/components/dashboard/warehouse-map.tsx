"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Thermometer, Droplets, AlertTriangle, CheckCircle } from "lucide-react";

const ZONES = [
    { id: 1, name: "Entrance Zone", temp: 5.2, humidity: 45, status: "Safe", x: "10%", y: "80%" },
    { id: 2, name: "Central Shelves A", temp: 4.8, humidity: 42, status: "Safe", x: "30%", y: "40%" },
    { id: 3, name: "Central Shelves B", temp: 4.9, humidity: 43, status: "Safe", x: "50%", y: "40%" },
    { id: 4, name: "Freezer Unit", temp: -18.2, humidity: 12, status: "Safe", x: "80%", y: "20%" },
    { id: 5, name: "Loading Dock", temp: 8.5, humidity: 60, status: "Warning", x: "85%", y: "80%" },
    { id: 6, name: "Back Corner", temp: 5.0, humidity: 44, status: "Safe", x: "20%", y: "20%" },
];

export function WarehouseMap() {
    return (
        <Card className="col-span-1 md:col-span-7 bg-[#0A1A2F] border-[#1e3a5f] relative overflow-hidden min-h-[500px]">
            <CardHeader className="absolute top-0 left-0 z-10">
                <CardTitle className="text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    Live Warehouse Conditions
                </CardTitle>
            </CardHeader>

            {/* Map Background simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-[10%] border-2 border-dashed border-white/30 rounded-xl" />
                <div className="absolute top-[10%] left-[40%] bottom-[10%] w-[20%] border-x-2 border-white/10" />
                <div className="absolute top-[40%] left-[10%] right-[10%] h-[20%] border-y-2 border-white/10" />
                {/* Heatmap overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-orange-500/10" />
            </div>

            <div className="relative h-[500px] w-full">
                <TooltipProvider>
                    {ZONES.map((zone) => (
                        <HoverCard key={zone.id}>
                            <HoverCardTrigger asChild>
                                <div
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110
                                    ${zone.status === 'Warning' ? 'animate-bounce-slow' : ''}
                                `}
                                    style={{ left: zone.x, top: zone.y }}
                                >
                                    <div className={`
                                    relative flex items-center justify-center h-12 w-12 rounded-full border-2 shadow-xl backdrop-blur-md
                                    ${zone.status === 'Safe' ? 'bg-green-500/20 border-green-500 text-green-400' :
                                            zone.status === 'Warning' ? 'bg-orange-500/20 border-orange-500 text-orange-400' :
                                                'bg-red-500/20 border-red-500 text-red-500'}
                                `}>
                                        <Thermometer className="h-6 w-6" />
                                        {zone.status === 'Warning' && (
                                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                                        {zone.temp}°C
                                    </div>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 bg-slate-900 border-slate-700 text-white p-0 overflow-hidden">
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-lg">{zone.name}</h4>
                                        <Badge variant={zone.status === 'Safe' ? 'default' : 'destructive'}
                                            className={zone.status === 'Safe' ? 'bg-green-600' : 'bg-orange-600'}>
                                            {zone.status}
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded">
                                            <Thermometer className="h-4 w-4 text-blue-400" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Temperature</p>
                                                <p className="font-mono font-bold">{zone.temp}°C</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/5 p-2 rounded">
                                            <Droplets className="h-4 w-4 text-cyan-400" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Humidity</p>
                                                <p className="font-mono font-bold">{zone.humidity}%</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-white/10">
                                        <p className="text-xs text-muted-foreground mb-1">24h Trend</p>
                                        <div className="h-8 flex items-end gap-1">
                                            {[40, 60, 45, 70, 50, 60, 55, 65, 50, 45].map((h, i) => (
                                                <div key={i} className="w-full bg-blue-500/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                        <p className="text-[10px] text-right text-muted-foreground mt-1">Stable (+0.1°C)</p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </TooltipProvider>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 text-xs text-white space-y-2">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> 2°C - 8°C (Safe)
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span> &gt; 8°C (Warning)
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span> &lt; 2°C (Cold)
                </div>
            </div>
        </Card>
    );
}
