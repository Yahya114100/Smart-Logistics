"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    ComposedChart
} from "recharts";

const data = [
    { time: "00:00", temp: 4.2, humidity: 45 },
    { time: "04:00", temp: 3.8, humidity: 48 },
    { time: "08:00", temp: 4.5, humidity: 46 },
    { time: "12:00", temp: 5.1, humidity: 52 },
    { time: "16:00", temp: 6.8, humidity: 58 }, // Spike
    { time: "20:00", temp: 4.9, humidity: 50 },
    { time: "23:59", temp: 4.4, humidity: 47 },
];

export function TempChart() {
    return (
        <Card className="col-span-4 transition-all hover:shadow-md">
            <CardHeader>
                <CardTitle>Temperature & Humidity Analytics</CardTitle>
                <CardDescription className="flex items-center gap-4">
                    <span>Sector Europe • Avg 4.8°C</span>
                    <span className="text-primary font-medium">Now: 5.2°C | 58% RH</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <defs>
                                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
                            <XAxis
                                dataKey="time"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                yAxisId="left"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}°C`}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}%`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                                itemStyle={{ color: 'var(--foreground)' }}
                                labelStyle={{ color: 'var(--muted-foreground)' }}
                            />
                            <Area yAxisId="left" type="monotone" dataKey="temp" name="Temperature" stroke="#00D4FF" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
                            <Area yAxisId="right" type="monotone" dataKey="humidity" name="Humidity" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorHum)" strokeWidth={3} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
